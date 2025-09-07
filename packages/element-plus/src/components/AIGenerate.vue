<template>
  <div :class="ns('ai-generate')">
    <el-input v-model="input" size="large" placeholder="请输入表单需求，例如：生成一个登陆表单">
      <template #append>
        <el-button @click="handleGenerate" :loading="loading">AI生成</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { ns, useDesignInstance } from '@form-magic/core'

const input = ref('')

const loading = ref(false)

const designInstance = useDesignInstance()

const apiKey = import.meta.env.VITE_COZE_API_KEY

const pollResult = async (conversation_id: string, chat_id: string) => {
  return await new Promise((resolve) => {
    const interval = setInterval(async () => {
      const res = await axios.get('/coze-api/v3/chat/retrieve', {
        params: {
          conversation_id,
          chat_id
        }
      })

      const { status } = res.data.data

      console.log('status', status)

      if (status === 'completed') {
        clearInterval(interval)
        resolve(undefined)
      }
    }, 1000)
  })
}

const handleGenerate = async () => {
  loading.value = true

  const res = await axios.post('/coze-api/v3/chat', {
    input: input.value,
    bot_id: '7546913648569729039',
    user_id: '123456',
    additional_messages: [
      {
        role: 'user',
        content: input.value,
        content_type: 'text'
      }
    ]
  })

  const info = res.data.data

  await pollResult(info.conversation_id, info.id)

  const result = await axios.get('/coze-api/v3/chat/message/list', {
    params: {
      conversation_id: info.conversation_id,
      chat_id: info.id
    }
  })

  if (result.data.code === 0) {
    const jsonStr = result.data.data[result.data.data.length - 2].content
    const json = JSON.parse(jsonStr)
    designInstance.updateSchema(json)
  }

  loading.value = false
}
</script>
