<template>
  <div v-if="read">
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

  <Select
    v-model="value"
    v-bind="$attrs"
    @change="selectChange"
    :multiple="multiple"
    :options="currentOptions"
    clearable
    filterable
    :loading="loading"
    v-else
  />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useFormInstance, useSelect, useUI } from '@/hooks'
import type { SelectProps, SelectValue } from '@/types'

const { Select } = useUI()

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  name: ''
})

const value = defineModel<SelectValue | SelectValue[]>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
