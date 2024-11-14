<template>
  <div class="form-item-grid">
    <LayoutRender :style="gridStyle" :children="children" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LayoutRender } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

const thisProps = defineProps<{
  props: Record<string, any>
  children: FormItemType[]
}>()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${thisProps.props.columns}, 1fr)`,
  'row-gap': thisProps.props['row-gap'] + 'px',
  'column-gap': thisProps.props['column-gap'] + 'px'
}))
</script>

<style lang="scss">
.form-item-grid {
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
