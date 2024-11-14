<template>
  <ElCard v-bind="props">
    <LayoutRender :children="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { LayoutRender } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

defineProps<{
  props: Record<string, any>
  children: FormItemType[]
}>()
 
</script>