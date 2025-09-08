<template>
  <div :class="ns('form-design-ai')">
    <div :class="ns('form-design-ai-content')">
      <Welcome
        v-if="!list.length"
        title="表单助理"
        icon="https://camo.githubusercontent.com/4ea7fdaabf101c16965c0bd3ead816c9d7726a59b06f0800eb7c9a30212d5a6a/68747470733a2f2f63646e2e656c656d656e742d706c75732d782e636f6d2f656c656d656e742d706c75732d782e706e67"
        description="请输入表单需求，例如：生成一个登陆表单"
      />
      <BubbleList v-else :list="list" style="height: 100%; max-height: 100%" @complete="onComplete">
        <template #footer="{ item }">
          <el-space v-if="item.done">
            <el-button type="primary" size="small" circle>
              <template #icon>
                <Icon name="copy" />
              </template>
            </el-button>
          </el-space>
        </template>
      </BubbleList>
    </div>
    <Sender
      :class="ns('form-design-ai-editor')"
      v-model="input"
      @submit="startSSE"
      @cancel="handleCancel"
      :loading="inputLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { ref, watch, type Ref } from 'vue'
import { BubbleList, Sender, useXStream, Welcome } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'
import { Icon, ns, runChatApi } from '@form-magic/core'

const input = ref('生成登陆表单')

const inputLoading = ref(false)

type Message = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
  result?: string
  done?: boolean
}

const list: Ref<Message[]> = ref([])

const { startStream, cancel, data } = useXStream()

// 默认支持 SSE 协议
const startSSE = async () => {
  list.value = [
    ...list.value,
    {
      key: Date.now(),
      role: 'user',
      placement: 'end',
      content: input.value
    },
    {
      key: Date.now(),
      role: 'ai',
      content: '',
      placement: 'start', // start | end 气泡位置
      isMarkdown: true, // 是否渲染为 markdown
      typing: true, // 是否开启打字器效果 该属性不会和流式接受冲突
      isFog: true, // 是否开启打字雾化效果,
      loading: true,
      done: false
    }
  ]

  inputLoading.value = true

  try {
    const response = await runChatApi({
      bot_id: '7546913648569729039',
      user_id: '123456',
      additional_messages: [
        {
          role: 'user',
          content: input.value,
          content_type: 'text'
        }
      ],
      stream: true
    })

    input.value = ''

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const errData = await response.json()
      if (errData.code === 4101) {
        const current = list.value.at(-1)!
        current.loading = false
        current.content = `❌ 出错了： 请设置token！`
        inputLoading.value = false
        return
      }
    }

    const readableStream = response.body!

    await startStream({ readableStream })
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const onComplete = () => {
  const current = list.value.at(-1)
  if (!current) return
  if (current.role !== 'ai') return
  if (!current.result) return

  inputLoading.value = false
  current.done = true
}

const handleCancel = () => {
  cancel()
  inputLoading.value = false
}

watch(
  () => cloneDeep(data.value),
  (newValue, oldValue) => {
    const current = list.value.at(-1)
    if (!current) return

    const latest = newValue.slice(oldValue.length) // 只取新增部分
    for (const { event, data: chunk } of latest) {
      const parsed = JSON.parse(chunk)

      if (event === 'conversation.message.delta') {
        current.content += parsed.content
        current.loading = false
      }

      if (event === 'done') {
        current.result = current.content
      }
    }
  }
)
</script>
