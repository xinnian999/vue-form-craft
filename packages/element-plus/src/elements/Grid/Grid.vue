<template>
  <FormItemGroup class="form-item-grid" :style="gridStyle" :list="children" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@form-magic/components'
import type { FormItemType } from '@form-magic/core'

const props = defineProps<{
  children: FormItemType[]
  columns: number
  rowGap: number
  columnGap: number
}>()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${props.columns}, 1fr)`,
  'row-gap': props.rowGap + 'px',
  'column-gap': props.columnGap + 'px'
}))
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item,
  .vfc-canvas-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
