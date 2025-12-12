<template>
  <span v-if="formInstance.read">{{ value?.replace(/./g, '*') }}</span>
  <Input v-else v-bind="$attrs" v-model="value" show-password />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { Input } = useUI()

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
