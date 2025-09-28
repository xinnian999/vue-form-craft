<template>
  <el-cascader
    v-model="value"
    :options="currentOptions"
    :loading="loading"
    :props="{
      multiple,
      label: labelKey,
      value: valueKey
    }"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup lang="ts">
import { useSelect } from '@/hooks'
import { type CascaderValue } from 'element-plus'
import type { SelectProps } from '@vue-form-craft/core'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: ''
})

const value = defineModel<CascaderValue>()

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
