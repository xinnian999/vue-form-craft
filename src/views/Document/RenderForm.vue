<template>
  <schema-form :schema="schema" class="renderForm" />
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

<style scoped>
.renderForm {
  border: 1px solid #eee;
  margin: 15px 0;
  padding: 20px;
}
</style>
