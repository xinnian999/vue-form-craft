<template>
  <schema-form :schema="schema" />
</template>

<script setup lang="jsx">
import { defineProps } from 'vue'
defineProps({
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] })
  }
})
</script>

<style scoped></style>
