<template>
  <FormItemGroup class="form-item-inline" :style="InlineStyle" v-model="children" />
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const props = defineProps<{
  align: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  autoWrap: boolean
  gap: number
}>()

const children = defineModel<FormItemType[]>({
  default: () => []
})

const InlineStyle = computed<StyleValue>(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': props.align,
  'flex-wrap': props.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${props.gap}px`
}))
</script>

<style scoped lang="scss">
.form-item-inline {
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    align-items: start;
  }
}
</style>
