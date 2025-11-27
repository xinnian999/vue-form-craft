<template>
  <el-cascader
    v-model="value"
    :options="currentOptions"
    :loading="loading"
    :props="{
      multiple
    }"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup lang="ts">
import { type CascaderValue } from 'element-plus'
import { useSelect } from '@/hooks'
import type { SelectProps } from '@/types'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  name: ''
})

const value = defineModel<CascaderValue>()

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
