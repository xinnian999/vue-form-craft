<template>
  <div :class="ns('form-design-ai')">
    <div class="content">
      <Welcome v-if="list.length === 0" @item-click="handleItemClick" />

      <BubbleList v-else :list="list" />
    </div>

    <Sender v-model="input" @submit="startSSE" @cancel="onCancel" :loading="inputLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Sender } from 'vue-element-plus-x'
import { ns, useDesignInstance } from '@vue-form-craft/core'
import BubbleList from './BubbleList.vue'
import generateJsonApi from './generateJsonApi'
import type { BubbleItem } from './type'
import Welcome from './Welcome.vue'

const input = ref('')

const inputLoading = ref(false)

const list: Ref<BubbleItem[]> = ref([])

const designInstance = useDesignInstance()

let controller: AbortController | null = null

// 默认支持 SSE 协议
const startSSE = async () => {
  list.value = [
    ...list.value,
    {
      key: Date.now(),
      role: 'user',
      content: input.value
    },
    {
      key: Date.now(),
      role: 'ai',
      content: '',
      loading: true
    }
  ]

  const prompt = `请基于当前表单，${input.value}，返回 JosnSchema`

  inputLoading.value = true

  input.value = ''

  const current = list.value.at(-1)!

  try {
    controller = new AbortController()

    const json = await generateJsonApi(
      {
        bot_id: '7546913648569729039',
        user_id: '123456',
        additional_messages: [
          {
            role: 'user',
            content: JSON.stringify(designInstance.schema),
            content_type: 'text'
          },
          {
            role: 'user',
            content: prompt,
            content_type: 'text'
          }
        ]
      },
      controller.signal
    )

    current.content = '✓ 已为您修改表单'
    designInstance.updateSchema(json)
  } catch (err) {
    current.content = err
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
</script>
