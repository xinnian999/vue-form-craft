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
import { useDesignInstance, useGlobals } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { createAiHelper, ns } from '@/utils'
import Welcome from './Welcome.vue'

type BubbleItem = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

const input = ref('')

const inputLoading = ref(false)

const list: Ref<BubbleItem[]> = ref([])

const designInstance = useDesignInstance()!

const { ai } = useGlobals()

const aiHelper = createAiHelper(ai)

let controller: AbortController | null = null

// AI生成表单
const startSSE = async () => {
  if (input.value === '') {
    return
  }

  // 检查AI功能是否可用
  if (!aiHelper.isAvailable()) {
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

  inputLoading.value = true

  const userInput = input.value
  input.value = ''

  const current = list.value.at(-1)!

  try {
    controller = new AbortController()

    const json = await aiHelper.generateFormSchema(
      userInput,
      designInstance.getSchema(),
      controller.signal
    )

    current.content = '✓ 已为您修改表单'
    designInstance.setSchema(json)
    designInstance.recordHistory()
  } catch (err: any) {
    current.content = err.message || '生成失败'
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
  controller?.abort()
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
    .el-bubble-end .el-bubble-content {
      background-color: $lightThemeColor;
    }

    .el-bubble-start .el-bubble-content {
      background-color: $lightSuccessColor;
    }

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

    .el-bubble-footer {
      margin-top: 5px;
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
      border: 1px solid #ccc;
      cursor: pointer;
      z-index: 10;
      background-color: #fff;
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
