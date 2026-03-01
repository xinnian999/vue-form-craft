<template>
  <Cascader
    v-model="value"
    :options="currentOptions"
    :loading="loading"
    :multiple="multiple"
    v-bind="$attrs"
    @change="selectChange"
  />
</template>

<script setup lang="ts">
import { useSelect, useUI } from '@/hooks'
import type { SelectProps } from '@/types'

const { Cascader } = useUI()

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  multiple: false,
  mode: 'static',
  name: ''
})

const value = defineModel<any>()

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
