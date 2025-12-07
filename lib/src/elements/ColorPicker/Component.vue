<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <ColorPicker v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { ColorPicker } = useUI()

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
