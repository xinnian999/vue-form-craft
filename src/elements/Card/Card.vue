<template>
  <ElCard v-bind="props">
    <CanvasWrapper :children="children" v-if="design" />
    <FormItemRender :formItems="children" v-else />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemRender, CanvasWrapper } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/config/commonType';

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
