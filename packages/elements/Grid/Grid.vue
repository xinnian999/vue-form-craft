<template>
  <div class="form-item-grid">
    <DefaultCanvasWrapper
      v-if="formInstance.design"
      :children="children"
      :style="gridStyle"
      title="栅格布局"
      :name="name"
    />

    <div v-else :style="gridStyle">
      <FormItem v-for="item in children" :key="item.name" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItem, DefaultCanvasWrapper } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'
import { useFormInstance } from '@vue-form-craft/hooks'

const thisProps = defineProps<{
  props: Record<string, any>
  children: FormItemType[]
  name: string
}>()

const formInstance = useFormInstance()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
  'row-gap': thisProps.props['row-gap'] + 'px',
  'column-gap': thisProps.props['column-gap'] + 'px'
}))
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
