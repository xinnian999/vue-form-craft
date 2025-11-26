<template>
  <ElCollapseItem :title="label" :name="name">
    <FormItemGroup :list="children" :style="designStyles" />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

defineProps<{
  label: string
  name: string
  children: FormItemType[]
}>()

const formInstance = useFormInstance()

const designStyles = computed(() => {
  return {
    background: formInstance.design && '#f4f3f3',
    paddingBottom: formInstance.design && '20px'
  }
})
</script>
