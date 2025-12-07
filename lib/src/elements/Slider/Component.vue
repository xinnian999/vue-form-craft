<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <Slider v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { useFormInstance, useUI } from '@/hooks'

const { Slider } = useUI()

const value = defineModel<number | [number, number]>()

const formInstance = useFormInstance()
</script>
