<template>
  <div class="form-item-grid">
    <DefaultCanvasWrapper
      v-if="design"
      :children="children"
      :style="gridStyle"
      title="栅格布局"
      :name="name"
    />

    <div v-else :style="gridStyle">
      <FormItemRender :formItems="children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {  computed } from 'vue'
import { FormItemRender, DefaultCanvasWrapper } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/release';

const thisProps = defineProps<{
  props:Record<string,any>
  children:FormItemType[]
  design: boolean
  name:string
}>()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
  'row-gap': thisProps.props['row-gap'] + 'px',
  'column-gap': thisProps.props['column-gap'] + 'px'
}))
</script>

<style scoped lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
