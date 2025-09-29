<template>
  <span v-if="formInstance.read">{{ value }}</span>
  <el-autocomplete
    v-else
    v-model="value"
    :fetch-suggestions="querySearch"
    clearable
    value-key="label"
    @select="handleSelect"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useFormInstance } from '@/hooks'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  options: Option[]
}>()

const value = defineModel<string>()

const formInstance = useFormInstance()

const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? props.options.filter(createFilter(queryString)) : props.options
  // call callback function to return suggestion objects
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: Option) => {
    return restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = (item: Record<string, any>) => {
  value.value = item.value
}
</script>
