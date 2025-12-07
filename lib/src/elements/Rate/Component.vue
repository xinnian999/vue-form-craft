<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <Rate v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { Rate } = useUI()

const value = defineModel<number>()

const formInstance = useFormInstance()
</script>
