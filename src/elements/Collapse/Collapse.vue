<template>
  <ElCollapse v-bind="{ ...props, ...$attrs }">
    <ElCollapseItem v-for="item in children" :key="item.title" :title="item.title">
      <FormRender :formItems="item.children" />
      <slot />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { FormRender } from '@/components'

defineProps({
  props: Object,
  children: Array
})
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
