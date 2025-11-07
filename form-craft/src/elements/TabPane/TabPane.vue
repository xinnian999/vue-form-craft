<template>
  <el-tab-pane :label="label" :name="name">
    <FormItemGroup :children="children" :designKey="designKey!" :style="designStyles" />
  </el-tab-pane>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

defineProps<{
  label: string
  name: string
  children?: FormItemType[]
  designKey?: string
}>()

const formInstance = useFormInstance()

const designStyles = computed(() => {
  return {
    background: formInstance.design && '#f4f3f3',
    padding: formInstance.design && '20px'
  }
})
</script>
