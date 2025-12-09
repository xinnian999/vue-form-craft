<template>
  <FormItemGroup
    class="form-item-grid"
    :style="gridStyle"
    :list="formItemProps.children || []"
    :designKey="formItemProps.designKey!"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

const props = defineProps<ComponentBaseProps>()

const formInstance = useFormInstance()

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${props.formItemProps.props?.columns || 2}, 1fr)`,
  'row-gap': (props.formItemProps.props?.rowGap || 10) + 'px',
  'column-gap': (props.formItemProps.props?.columnGap || 10) + 'px',
  background: formInstance.design && '#f4f3f3'
}))
</script>
