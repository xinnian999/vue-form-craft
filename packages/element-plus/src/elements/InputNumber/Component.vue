<template>
  <div v-if="formInstance.read">{{ value }}</div>
  <el-input-number v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
import { useFormInstance } from '@form-magic/core'

const value = defineModel<number>()

const formInstance = useFormInstance()
</script>
