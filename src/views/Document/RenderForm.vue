<template>
  <schema-form :schema="currentSchema" class="renderForm" />
</template>

<script setup lang="jsx">
import { defineProps, computed } from 'vue'
import { changeItems } from '@/utils'

const props = defineProps({
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] })
  }
})

const currentSchema = computed(() => {
  return { ...props.schema, items: changeItems(props.schema.items) }
})
</script>

<style scoped>
.renderForm {
  border: 1px solid #eee;
  margin: 15px 0;
  padding: 20px;
}
</style>
