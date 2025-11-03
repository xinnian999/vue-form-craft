<template>
  <el-tab-pane :label="label" :name="name">
    <FormItemGroup
      :children="children"
      :designKey="designKey!"
      :style="{ background: formInstance.design && '#f4f3f3' }"
    />
  </el-tab-pane>
</template>

<script setup lang="ts">
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
</script>
