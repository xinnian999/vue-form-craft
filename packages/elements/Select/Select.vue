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

  <el-select
    v-model="value"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    clearable
    filterable
    v-loading="loading"
    v-else
  >
    <el-option
      v-for="item in currentOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
      :disabled="item[disabledKey]"
    >
      {{ item[labelKey] }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { useFormInstance, useSelect } from '@vue-form-craft/hooks'
import type { SelectProps, SelectValue } from '@vue-form-craft/types'
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
