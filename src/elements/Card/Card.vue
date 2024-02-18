<template>
  <ElCard v-bind="{ ...props, ...$attrs }">
    <FormRender :formItems="children" />
    <slot />
  </ElCard>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElCard } from 'element-plus'
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
