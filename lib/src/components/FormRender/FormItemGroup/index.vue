<template>
  <CanvasGroup v-if="formInstance.design" :list="list" :group="group" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import CanvasGroup from './CanvasGroup.vue'
import FormItem from './FormItem.vue'

defineProps<{
  group?: string
  list: FormItemType[]
}>()

const formInstance = useFormInstance()
</script>
