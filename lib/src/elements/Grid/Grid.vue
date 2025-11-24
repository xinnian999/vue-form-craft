<template>
  <FormItemGroup class="form-item-grid" :style="gridStyle" :list="children" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const props = defineProps<{
  columns: number
  rowGap: number
  columnGap: number
  children: FormItemType[]
}>()

const formInstance = useFormInstance()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${props.columns}, 1fr)`,
  'row-gap': props.rowGap + 'px',
  'column-gap': props.columnGap + 'px',
  background: formInstance.design && '#f4f3f3'
}))
</script>
