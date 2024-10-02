<template>
  <div v-if="read">{{ value }}</div>
  <el-input v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
defineProps<{
  read?: boolean
}>()

const value = defineModel<string>()
</script>
