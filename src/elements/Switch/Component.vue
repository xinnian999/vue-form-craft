<template>
  <el-switch v-bind="$attrs" v-model="value" :disabled="read||disabled" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/hooks';

defineProps<{
  disabled?: boolean
}>()

const { read } = useFormInstance()

const value = defineModel<any>()
</script>
