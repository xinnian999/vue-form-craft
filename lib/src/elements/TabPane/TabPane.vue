<template>
  <el-tab-pane
    :label="formItemProps.label"
    :name="formItemProps.name"
    :lazy="formItemProps.props?.lazy"
  >
    <FormItemGroup :list="formItemProps.children || []" :style="designStyles" />
  </el-tab-pane>
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
    padding: formInstance.design && '20px'
  }
})
</script>
