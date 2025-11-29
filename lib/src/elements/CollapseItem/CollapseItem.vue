<template>
  <ElCollapseItem :title="formItemProps.label" :name="formItemProps.name">
    <FormItemGroup :list="formItemProps.children || []" :style="designStyles" />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

defineProps<ComponentBaseProps>()

const formInstance = useFormInstance()

const designStyles = computed(() => {
  return {
    background: formInstance.design && '#f4f3f3',
    paddingBottom: formInstance.design && '20px'
  }
})
</script>
