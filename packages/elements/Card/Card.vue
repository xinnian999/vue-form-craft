<template>
  <ElCard v-bind="props">
    <CanvasWrapper :children="children" v-if="formInstance.design" />
    <FormItemRender :formItems="children" v-else />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemRender, CanvasWrapper } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'
import { useFormInstance } from '@vue-form-craft/hooks'

defineProps<{
  props: Record<string, any>
  children: FormItemType[]
}>()

const formInstance = useFormInstance()
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
