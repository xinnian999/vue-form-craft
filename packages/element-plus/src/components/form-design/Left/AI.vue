<template>
  <div :class="ns('form-design-ai')">
    <div :class="ns('form-design-ai-content')">
      <Welcome
        v-if="!list.length"
        title="表单助理"
        icon="https://camo.githubusercontent.com/4ea7fdaabf101c16965c0bd3ead816c9d7726a59b06f0800eb7c9a30212d5a6a/68747470733a2f2f63646e2e656c656d656e742d706c75732d782e636f6d2f656c656d656e742d706c75732d782e706e67"
        description="请输入表单需求，例如：生成一个登陆表单"
      />
      <BubbleList v-else :list="list" style="height: 100%; max-height: 100%" />
    </div>
    <Sender
      :class="ns('form-design-ai-editor')"
      v-model="input"
      @submit="startSSE"
      :loading="isLoading"
      :disabled="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import { BubbleList, Sender, useXStream, Welcome } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'
import { getRandomId, ns, runChatApi } from '@form-magic/core'

const input = ref('生成登陆表单')

type Message = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

const list: Ref<Message[]> = ref([])

const { startStream, cancel, data, error, isLoading } = useXStream()

// 默认支持 SSE 协议
async function startSSE() {
  list.value = [
    ...list.value,
    {
      key: Date.now(),
      role: 'user',
      placement: 'start',
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
      loading: true
    }
  ]

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
    const readableStream = response.body!
    await startStream({ readableStream })

    // console.log('data', data.value)
  } catch (err) {
    // console.error('Fetch error:', err)
  }
}

watch(
  data,
  (oldValue, newValue) => {
    if (!newValue.length) return

    const current = list.value.at(-1)

    const text = newValue.reduce((acc: string, cur: any) => {
      const event = cur.event
      const chunk = cur.data

      const parsedChunk = JSON.parse(chunk)

      try {
        if (event === 'conversation.message.delta') {
          acc += parsedChunk.content
          current!.loading = false
        }
        if (event === 'conversation.chat.completed') {
          input.value = ''
        }
      } catch (error) {
        //   console.log({ parsedChunk })
        //   text += parsedChunk.content
      }
      return acc
    }, '')

    if (current?.role === 'ai') {
      current.content = text
    }
  },
  { deep: true }
)
</script>
