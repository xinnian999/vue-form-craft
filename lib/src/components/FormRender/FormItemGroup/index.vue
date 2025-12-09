<template>
  <CanvasGroup v-if="formInstance.design" :list="designList" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignInstance, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import CanvasGroup from './CanvasGroup.vue'
import FormItem from './FormItem.vue'

const props = defineProps<{
  list: FormItemType[]
  designKey: string
}>()

const formInstance = useFormInstance()

const designInstance = useDesignInstance()

// 设计模式时，桥接对应list数据，避免直接修改props
const designList = computed(() => {
  if (!designInstance) return []

  if (props.designKey === 'root') {
    const rootList = designInstance.getSchema().items

    // 补充items数据
    if (!rootList) {
      designInstance.setSchema({
        ...designInstance.getSchema(),
        items: []
      })
      designInstance.recordHistory('补充items数据')
    }

    return rootList || []
  }
  return designInstance.getNodeByKey(props.designKey)?.children || []
})
</script>
