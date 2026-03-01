<template>
  <div :class="ns('form-design-ai')">
    <div class="content">
      <Welcome v-if="list.length === 0" @item-click="handleItemClick" />

      <BubbleList :list="list" class="bubble-list">
        <template #loading>
          <div class="loading">
            <div class="loading-loader"></div>
            <div class="loading-text">表单制作中 请稍等...</div>
          </div>
        </template>

        <template #footer="{ item }">
          <div class="footer" v-if="item.role === 'user'">
            <div
              class="item"
              v-for="{ icon, onClick } in footerConfig"
              @click="onClick(item)"
              :key="icon"
            >
              <Icon :name="icon" />
            </div>
          </div>
        </template>
      </BubbleList>
    </div>

    <div class="sender">
      <Icon v-if="list.length" class="clear" name="clear" @click="handleClear" />

      <Sender v-model="input" @submit="startSSE" @cancel="onCancel" :loading="inputLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { BubbleList, Sender } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'
import { Icon } from '@/components'
import generateSchemaPrompt from '@/config/generateSchemaPrompt.md?raw'
import { useAi, useDesignInstance } from '@/hooks'
import { ns, removeDesignKeys } from '@/utils'
import Welcome from './Welcome.vue'

type BubbleItem = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

const input = ref('')

const inputLoading = ref(false)

const list: Ref<BubbleItem[]> = ref([])

const designInstance = useDesignInstance()!

const { isAvailable, request, cancel } = useAi()

// 提取 JSON 内容（去除 Markdown 代码块标记）
const extractJson = (content: string): string => {
  if (typeof content !== 'string') {
    return content
  }

  // 去除首尾空白
  let text = content.trim()

  // 如果包含 Markdown 代码块标记，提取其中的 JSON
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/m
  const match = text.match(codeBlockRegex)
  if (match) {
    text = match[1].trim()
  }

  // 如果还有代码块标记（嵌套情况），继续清理
  text = text.replace(/^```(?:json)?\s*\n?/gm, '').replace(/\n?```$/gm, '').trim()

  return text
}

// AI生成表单
const startSSE = async () => {
  if (input.value === '') {
    return
  }

  // 检查AI功能是否可用
  if (!isAvailable) {
    list.value = [
      ...list.value,
      {
        key: Date.now(),
        role: 'user',
        content: input.value,
        placement: 'end'
      },
      {
        key: Date.now(),
        role: 'ai',
        content: '❌ AI功能未配置,请在app.use时注入ai函数'
      }
    ]
    return
  }

  onCancel()

  list.value = [
    ...list.value,
    {
      key: Date.now(),
      role: 'user',
      content: input.value,
      placement: 'end'
    },
    {
      key: Date.now(),
      role: 'ai',
      content: '',
      loading: true
    }
  ]

  const userInput = input.value
  input.value = ''

  const current = list.value.at(-1)!

  try {
    const schema = removeDesignKeys(designInstance.getSchema())
    const promptPayload = {
      currentSchema: schema,
      requirement: userInput
    }
    const prompt = `${generateSchemaPrompt}\n\n输入上下文(JSON):${JSON.stringify(promptPayload)}`

    const result = await request(prompt)

    if (!result) {
      current.content = current.content || '生成失败'
      return
    }

    try {
      // 提取 JSON 内容（自动处理 Markdown 代码块）
      const jsonString = typeof result === 'string' ? extractJson(result) : JSON.stringify(result)
      const json = JSON.parse(jsonString)
      current.content = '✓ 已为您修改表单'
      designInstance.setSchema(json)
      designInstance.recordHistory('AI生成表单')
    } catch (e) {
      console.error('AI生成错误:', { error: e, rawContent: result })
      current.content = 'AI生成错误，请检查输出格式'
    }
  } finally {
    inputLoading.value = false
    current.loading = false
  }
}

const handleItemClick = (item: string) => {
  input.value = item
  startSSE()
}

const onCancel = () => {
  inputLoading.value = false
  cancel()
}

const footerConfig = [
  {
    icon: 'copy',
    onClick: (item: BubbleItem) => {
      input.value = item.content!
    }
  },
  {
    icon: 'refresh',
    onClick: (item: BubbleItem) => {
      input.value = item.content!
      startSSE()
    }
  }
]

const handleClear = () => {
  list.value = []
  input.value = ''
}
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-ai') {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 12px;

  --el-font-size-base: 12px;

  .content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .bubble-list {
    max-height: 100%;
    padding-bottom: 50px;

    .loading {
      display: flex;
      align-items: center;
      gap: 10px;

      &-loader {
        position: relative;
        width: 2.5em;
        height: 2.5em;
        transform: rotate(165deg);
      }

      &-loader:before,
      &-loader:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 0.25em;
        transform: translate(-50%, -50%);
      }

      &-loader:before {
        animation: before8 2s infinite;
      }

      &-loader:after {
        animation: after6 2s infinite;
      }

      @keyframes before8 {
        0% {
          width: 0.5em;
          box-shadow:
            1em -0.5em rgba(225, 20, 98, 0.75),
            -1em 0.5em rgba(111, 202, 220, 0.75);
        }

        35% {
          width: 2.5em;
          box-shadow:
            0 -0.5em rgba(225, 20, 98, 0.75),
            0 0.5em rgba(111, 202, 220, 0.75);
        }

        70% {
          width: 0.5em;
          box-shadow:
            -1em -0.5em rgba(225, 20, 98, 0.75),
            1em 0.5em rgba(111, 202, 220, 0.75);
        }

        100% {
          box-shadow:
            1em -0.5em rgba(225, 20, 98, 0.75),
            -1em 0.5em rgba(111, 202, 220, 0.75);
        }
      }

      @keyframes after6 {
        0% {
          height: 0.5em;
          box-shadow:
            0.5em 1em rgba(61, 184, 143, 0.75),
            -0.5em -1em rgba(233, 169, 32, 0.75);
        }

        35% {
          height: 2.5em;
          box-shadow:
            0.5em 0 rgba(61, 184, 143, 0.75),
            -0.5em 0 rgba(233, 169, 32, 0.75);
        }

        70% {
          height: 0.5em;
          box-shadow:
            0.5em -1em rgba(61, 184, 143, 0.75),
            -0.5em 1em rgba(233, 169, 32, 0.75);
        }

        100% {
          box-shadow:
            0.5em 1em rgba(61, 184, 143, 0.75),
            -0.5em -1em rgba(233, 169, 32, 0.75);
        }
      }
    }

    .footer {
      display: flex;
      gap: 5px;
      align-items: center;

      .item {
        cursor: pointer;
        padding: 3px;
        border-radius: 50%;
        background-color: $themeColor;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .sender {
    position: relative;
    .clear {
      position: absolute;
      // right: 50%;
      left: 0;
      // transform: translateX(50%);
      top: -35px;
      border: 1px solid $borderColor;
      cursor: pointer;
      z-index: 10;
      background-color: $bgColor;
      padding: 5px;
      font-size: 16px;
      border-radius: 50%;
      &:hover {
        background-color: $lightThemeColor;
      }
    }
  }
}
</style>
