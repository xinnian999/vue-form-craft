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
import { Icon, ns, useDesignInstance, useGlobals } from '@vue-form-craft/core'
import generateJsonApi from './generateJsonApi'
import Welcome from './Welcome.vue'

type BubbleItem = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

const input = ref('')

const inputLoading = ref(false)

const list: Ref<BubbleItem[]> = ref([])

const designInstance = useDesignInstance()

const { ai } = useGlobals()

let controller: AbortController | null = null

// 默认支持 SSE 协议
const startSSE = async () => {
  if (input.value === '') {
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

  const prompt = `请基于当前表单，${input.value}`

  inputLoading.value = true

  input.value = ''

  const current = list.value.at(-1)!

  try {
    controller = new AbortController()

    const json = await generateJsonApi({
      data: {
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
      signal: controller.signal,
      ai
    })

    current.content = '✓ 已为您修改表单'
    designInstance.updateSchema(json)
  } catch (err: any) {
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
