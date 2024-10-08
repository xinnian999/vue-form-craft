<template>
  <el-switch v-bind="$attrs" v-model="value" :disabled="read||disabled" />
</template>

<script setup lang="ts">
defineProps<{
  read?: boolean
  disabled?: boolean
}>()

const value = defineModel<any>()
</script>
