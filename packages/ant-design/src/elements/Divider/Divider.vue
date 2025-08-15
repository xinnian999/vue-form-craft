<template>
  <ElDivider v-bind="$attrs">{{ title }}</ElDivider>
</template>

<script setup lang="ts">
defineProps<{title:string}>()
</script>

