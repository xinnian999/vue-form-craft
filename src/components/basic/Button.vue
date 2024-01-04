<template>
  <el-button v-bind="props" @click="handleSubmit">{{ name }}</el-button>
</template>

<script setup>
import { defineProps, inject } from 'vue'

const handleSubmit = inject('$submit')

const props = defineProps({
  name: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'primary'
  }
})
</script>
