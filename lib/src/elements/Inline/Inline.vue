<template>
  <FormItemGroup
    class="form-item-inline"
    :style="InlineStyle"
    :list="formItemProps.items || []"
    :designKey="formItemProps.designKey!"
  />
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { FormItemGroup } from '@/components'
import type { ComponentBaseProps } from '@/types'

const props = defineProps<ComponentBaseProps>()

const InlineStyle = computed<StyleValue>(() => ({
  width: '100%',
  display: 'flex',
  'justify-content': props.formItemProps.componentProps?.align || 'flex-start',
  'flex-wrap': props.formItemProps.componentProps?.autoWrap ? 'wrap' : 'nowrap',
  'overflow-x': 'auto',
  gap: `${props.formItemProps.componentProps?.gap || 10}px`
}))
</script>

<style lang="scss">
.form-item-inline {
  width: 100%;
  background-color: #f4f3f3;
}
</style>
