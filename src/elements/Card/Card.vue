<template>
  <ElCard v-bind="props">
    <CanvasWrapper :children="children" v-if="design" />
    <FormItemRender :formItems="children" v-else />
  </ElCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ElCard } from 'element-plus'
import { FormItemRender, CanvasWrapper } from '@/components'
import type { FormItemType } from '@/config/commonType';

defineProps<{
  props:Record<string,any>
  children:FormItemType[]
  design: boolean
}>()
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
