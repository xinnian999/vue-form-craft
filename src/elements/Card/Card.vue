<template>
  <ElCard v-bind="{ ...props, ...$attrs }">
    <CanvasWrapper :children="children" v-if="design" />
    <FormRender :formItems="children" v-else />
  </ElCard>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElCard } from 'element-plus'
import { FormRender, CanvasWrapper } from '@/components'

defineProps({
  props: Object,
  children: Array,
  design: Boolean
})
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
