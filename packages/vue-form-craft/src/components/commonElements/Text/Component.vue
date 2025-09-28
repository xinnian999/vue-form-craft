<template>
  <div v-bind="$attrs">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

