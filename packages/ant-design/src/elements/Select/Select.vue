<template>
  <div v-if="formInstance.read">
    <div v-if="multiple">
      {{
        value &&
        (value as SelectValue[])
          .map((item) => currentOptions.find((v) => v[valueKey] === item)?.[labelKey])
          .join('、')
      }}
    </div>
    <div v-else>{{ currentOptions.find((item) => item[valueKey] === value)?.[labelKey] }}</div>
  </div>

  <a-select
    v-model:value="value"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable
    filterable
    v-loading="loading"
    v-else
  >
    <a-option
      v-for="item in currentOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
      :disabled="item[disabledKey]"
    >
      {{ item[labelKey] }}
    </a-option>
  </a-select>
</template>

<script setup lang="ts">
import { useFormInstance, useSelect } from '@form-magic/core'
import type { SelectProps, SelectValue } from '@form-magic/core'
import { watch } from 'vue'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  disabledKey: 'disabled',
  name: ''
})

const value = defineModel<SelectValue | SelectValue[]>()

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
