<template>
  <div class="form-item-grid">
    <FormItemGroup :style="gridStyle" :list="children" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

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
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
