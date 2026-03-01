<template>
  <Switch v-bind="$attrs" v-model="value" :disabled="read || disabled" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormInstance, useUI } from '@/hooks'

const { Switch } = useUI()

defineProps<{
  disabled?: boolean
}>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)

const value = defineModel<any>()
</script>
