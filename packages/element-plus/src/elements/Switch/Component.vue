<template>
  <el-switch v-bind="$attrs" v-model="value" :disabled="formInstance.read||disabled" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@form-magic/core';

defineProps<{
  disabled?: boolean
}>()

const formInstance = useFormInstance()

const value = defineModel<any>()
</script>
