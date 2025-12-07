<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <DatePicker v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { DatePicker } = useUI()

const value = defineModel<string | Date | [string, string] | [Date, Date]>()

const formInstance = useFormInstance()
</script>
