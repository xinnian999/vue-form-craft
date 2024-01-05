<template>
  <el-button v-bind="{ ...$attrs, ...props }" @click="onClick">{{ name }}</el-button>
</template>

<script setup>
import { defineProps, inject } from 'vue'

const formEvents = inject('$formEvents')

const props = defineProps({
  name: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'primary'
  },
  clickEvent: String
})

const onClick = () => {
  if (props.clickEvent === 'submitForm') {
    formEvents.submit()
  }
  if (props.clickEvent === 'resetForm') {
    formEvents.reset()
  }
}
</script>
