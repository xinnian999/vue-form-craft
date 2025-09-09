<template>
  <div :class="ns('form-design-ai')">
    <div class="content">
      <el-alert v-if="!list.length" type="primary" :closable="false" class="welcome">
        <template #title>
          <div class="title">Form Magic 表单助手</div>
        </template>
        <div class="desc">我可以帮你生成 or 修改表单。</div>
        <div class="prompt-title">可以试着问我：</div>
        <Prompts vertical :items="items" @item-click="handleItemClick" />
      </el-alert>

      <BubbleList v-else :list="list" style="height: 100%; max-height: 100%">
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
import { BubbleList, Prompts, Sender } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts'
import { $designInstance, generateJsonApi, ns } from '@form-magic/core'

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
          content: `请基于当前表单，${input.value}`,
          content_type: 'text'
        }
      ]
    })

    input.value = ''
    inputLoading.value = false

    // const contentType = response.headers.get('content-type') || ''
    // if (contentType.includes('application/json')) {
    //   const errData = await response.json()
    //   if (errData.code === 4101) {
    //     const current = list.value.at(-1)!
    //     current.loading = false
    //     current.content = `❌ 出错了： 请设置token！`
    //     inputLoading.value = false
    //     return
    //   }
    // }
    const current = list.value.at(-1)!
    current.loading = false
    current.content = '✓ 已为您修改表单'

    designInstance.updateSchema(json)
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const handleCancel = () => {
  // cancel()
  inputLoading.value = false
}

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '生成一个登录表单'
  },
  {
    key: '2',
    label: '生成一个就诊满意度表单'
  }
])

function handleItemClick(item: PromptsItemsProps) {
  input.value = item.label!
  startSSE()
}
</script>
