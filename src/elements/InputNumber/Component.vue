<template>
  <div v-if="read">{{ value }}</div>
  <el-input-number v-else v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
defineProps<{
  read?: boolean
}>()

const value = defineModel<number>()
</script>
