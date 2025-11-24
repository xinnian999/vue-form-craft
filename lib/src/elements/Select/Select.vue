<template>
  <div v-if="formInstance.read">
    <div v-if="multiple">
      {{
        value &&
        (value as SelectValue[])
          .map((item) => currentOptions.find((v) => v.value === item)?.label)
          .join('、')
      }}
    </div>
    <div v-else>{{ currentOptions.find((item) => item.value === value)?.label }}</div>
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
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFormInstance, useSelect } from '@/hooks'
import type { SelectProps, SelectValue } from '@/types'

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  name: ''
})

const value = defineModel<SelectValue | SelectValue[]>()

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
