<template>
  <CanvasGroup v-if="design" :designKey="designKey" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import CanvasGroup from './CanvasGroup.vue'
import FormItem from './FormItem.vue'

defineProps<{
  list: FormItemType[]
  designKey?: string
}>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const design = computed(() => formInstance?.getDesign() ?? false)
</script>
