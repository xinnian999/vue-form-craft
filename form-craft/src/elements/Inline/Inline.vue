<template>
  <FormItemGroup
    class="form-item-inline"
    :style="InlineStyle"
    :children="children"
    :designKey="designKey"
  />
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const props = defineProps<{
  align: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  autoWrap: boolean
  gap: number
  designKey: string
  children?: FormItemType[]
}>()

const InlineStyle = computed<StyleValue>(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': props.align,
  'flex-wrap': props.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${props.gap}px`
}))
</script>

<style lang="scss">
.form-item-inline {
  width: 100%;
  background-color: #f4f3f3;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
