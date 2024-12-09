<template>
  <el-tree-select
    v-model="value"
    :data="currentOptions"
    :loading="loading"
    :render-after-expand="false"
    :props="{
      label: labelKey,
      value: valueKey
    }"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup lang="ts">
import { type CascaderValue } from 'element-plus'
import useSelect from '@vue-form-craft/hooks/useSelect'
import type { SelectProps } from '@vue-form-craft/types'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: ''
})

const value = defineModel<CascaderValue>()

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
