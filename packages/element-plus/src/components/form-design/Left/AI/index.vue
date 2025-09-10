<template>
  <div :class="ns('form-design-ai')">
    <div class="content">
      <Welcome v-if="list.length === 0" @item-click="handleItemClick" />

      <BubbleList v-else :list="list">
        <template #loading>
          <div :class="ns('bubble-loading')">
            <div :class="ns('bubble-loading-loader')"></div>
            <div :class="ns('bubble-loading-text')">表单制作中 请稍等...</div>
          </div>
        </template>
      </BubbleList>
    </div>

    <Sender
      v-model="input"
      @submit="startSSE"
      @cancel="handleCancel"
      :loading="inputLoading"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { BubbleList, Sender } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'
import { $designInstance, ns } from '@vue-form-craft/core'
import generateJsonApi from './generateJsonApi'
import Welcome from './Welcome.vue'

const input = ref('')

const inputLoading = ref(false)

type Message = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
  result?: string
  done?: boolean
}

const list: Ref<Message[]> = ref([])

const designInstance = inject($designInstance)!

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

const handleCancel = () => {
  // cancel()
  inputLoading.value = false
}

function handleItemClick(item: string) {
  input.value = item
  startSSE()
}
</script>
