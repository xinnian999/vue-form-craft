<template>
  <span v-if="formInstance.read">{{ value?.replace(/./g, '*') }}</span>
  <el-input v-else v-bind="$attrs" v-model="value" show-password />
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/core'

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
