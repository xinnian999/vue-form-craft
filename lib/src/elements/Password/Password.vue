<template>
  <span v-if="read">{{ value?.replace(/./g, '*') }}</span>
  <Input v-else v-bind="$attrs" v-model="value" show-password />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormInstance, useUI } from '@/hooks'

const { Input } = useUI()

const value = defineModel<string>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)
</script>
