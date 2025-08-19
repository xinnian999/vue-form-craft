<template>
  <a-divider v-bind="$attrs">{{ title }}</a-divider>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
