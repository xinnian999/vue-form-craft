<template>
  <FormItemGroup
    class="form-item-grid"
    :style="gridStyle"
    :list="formItemProps.children!"
    :designKey="formItemProps.designKey!"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

const props = defineProps<
  ComponentBaseProps & {
    columns?: number
    rowGap?: number
    columnGap?: number
  }
>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const design = computed(() => formInstance?.getDesign() ?? false)

const gridStyle = computed(() => {
  const { columns, rowGap, columnGap } = props

  const style: any = {
    display: 'grid',
    'grid-template-columns': `repeat(${columns}, 1fr)`,
    'row-gap': `${rowGap}px`,
    'column-gap': `${columnGap}px`
  }

  if (design.value) {
    style.background = '#f4f3f3'
    style.padding = '10px'
  }

  return style
})
</script>
