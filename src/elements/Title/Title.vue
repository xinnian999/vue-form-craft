<template>
  <component :is="type" class="Title" :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{
    title
  }}</component>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '这是一个标题'
  },
  type: {
    type: String,
    default: 'h3'
  },
  italic: Boolean
})
</script>
