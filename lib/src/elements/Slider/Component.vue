<template>
  <div v-if="read">{{ value }}</div>
  <Slider v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormInstance, useUI } from '@/hooks'

const { Slider } = useUI()

const value = defineModel<number | [number, number]>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)
</script>
