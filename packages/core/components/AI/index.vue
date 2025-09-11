<template>
  <div :class="ns('form-design-ai')">
    <div class="content">
      <Welcome v-if="list.length === 0" @item-click="handleItemClick" />

      <BubbleList v-else :list="list" />
    </div>

    <Sender v-model="input" @submit="startSSE" />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDesignInstance, ns } from '@vue-form-craft/core'
import BubbleList from './BubbleList.vue'
import generateJsonApi from './generateJsonApi'
import { Sender } from 'vue-element-plus-x';
import type { BubbleItem } from './type'
import Welcome from './Welcome.vue'

const input = ref('')

const inputLoading = ref(false)

const list: Ref<BubbleItem[]> = ref([])

const designInstance = useDesignInstance()

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

  inputLoading.value = true

  try {
    const json = await generateJsonApi({
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
          content: `请基于当前表单，${input.value}，返回 JosnSchema`,
          content_type: 'text'
        }
      ]
    })

    input.value = ''
    inputLoading.value = false

    const current = list.value.at(-1)!

    current.loading = false

    if (typeof json === 'string') {
      current.content = json
    } else {
      current.content = '✓ 已为您修改表单'
      designInstance.updateSchema(json)
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

function handleItemClick(item: string) {
  input.value = item
  startSSE()
}
</script>
