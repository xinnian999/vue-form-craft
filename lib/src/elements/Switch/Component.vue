<template>
  <Switch v-bind="$attrs" v-model="value" :disabled="formInstance.read || disabled" />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { Switch } = useUI()

defineProps<{
  disabled?: boolean
}>()

const formInstance = useFormInstance()

const value = defineModel<any>()
</script>
