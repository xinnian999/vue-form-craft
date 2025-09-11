<template>
  <Input v-model="value" @keyup.enter="handleSubmit" />
</template>

<script setup lang="ts">
import { useElements } from '@vue-form-craft/core'

const value = defineModel<string>()

const emit = defineEmits(['submit'])

const elements = useElements()

const Input = elements.Input.render

const handleSubmit = () => {
  emit('submit')
}
</script>

