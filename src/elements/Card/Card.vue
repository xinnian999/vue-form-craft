<template>
  <ElCard v-bind="{ ...props, ...$attrs }">
    <FormRender v-model="formValues" :formItems="children" />
    <slot />
  </ElCard>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import { ElCard } from 'element-plus'
import { FormRender } from '@/components'

const thisProps = defineProps({
  props: Object,
  children: Array,
  design: Boolean
})

const formValues = thisProps.design ? {} : inject('$formValues')
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
