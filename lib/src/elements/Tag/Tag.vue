<template>
  <Tag :type="type">{{ text }}</Tag>
</template>

<script setup lang="ts">
import { useUI } from '@/hooks'

const { Tag } = useUI()

withDefaults(
  defineProps<{ text?: string; type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' }>(),
  {
    text: '标签',
    type: 'primary'
  }
)
</script>
