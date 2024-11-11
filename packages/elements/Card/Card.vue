<template>
  <ElCard v-bind="props">
    <CanvasWrapper :children="children" v-if="formInstance.design" />
    <template v-else>
      <FormItem v-for="item in children" :key="item.name" v-bind="item" />
    </template>
  </ElCard>
</template>

<script setup lang="ts">
import { FormItem } from '@vue-form-craft/components'
import { CanvasWrapper } from '@vue-form-craft/form-design'
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
