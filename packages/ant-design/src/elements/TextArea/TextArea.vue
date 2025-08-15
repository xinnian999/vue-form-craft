<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <a-input v-else v-bind="$attrs" v-model="value" type="textarea" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@form-magic/core'

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
