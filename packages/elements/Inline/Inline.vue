<template>
  <div class="form-item-inline">
    <FormItemGroup :style="InlineStyle" :children="children" />
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { FormItemGroup } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

const thisProps = defineProps<{
  props: Record<string, any>
  children: FormItemType[]
}>()

const InlineStyle = computed<StyleValue>(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': thisProps.props.align,
  'flex-wrap': thisProps.props.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${thisProps.props.gap}px`
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
