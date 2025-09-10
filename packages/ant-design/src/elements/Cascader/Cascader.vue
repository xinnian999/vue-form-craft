<template>
  <a-cascader
    v-model:value="value"
    :options="currentOptions"
    :loading="loading"
    :fieldNames="{
      label: labelKey,
      value: valueKey
    }"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup lang="ts">
import { type CascaderValue } from 'element-plus'
import { useSelect } from '@vue-form-craft/core'
import type { SelectProps } from '@vue-form-craft/core'

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
