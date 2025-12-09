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

const designList = computed(() => {
  if (props.designKey === 'root') {
    return designInstance?.getSchema().items || []
  }
  return designInstance?.getNodeByKey(props.designKey)?.children || []
})
</script>
