<template>
  <el-switch v-bind="$attrs" v-model="value" :disabled="formInstance.read||disabled" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/hooks';

defineProps<{
  disabled?: boolean
}>()

const formInstance = useFormInstance()

const value = defineModel<any>()
</script>
