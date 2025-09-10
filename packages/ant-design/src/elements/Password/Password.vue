<template>
  <span v-if="formInstance.read">{{ value?.replace(/./g, '*') }}</span>
  <a-input v-else v-bind="$attrs" v-model:value="value" type="password" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/core'

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
