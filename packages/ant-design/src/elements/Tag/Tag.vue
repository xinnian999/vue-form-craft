<template>
  <a-tag :type="type">{{ text }}</a-tag>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{ text?: string; type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' }>(),
  {
    text: '标签',
    type: 'primary'
  }
)
</script>
