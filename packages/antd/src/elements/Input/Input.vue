<template>
  <span v-if="formInstance.read">{{ value }}</span>
  <a-input v-else v-bind="$attrs" v-model:value="value" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/core'

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
