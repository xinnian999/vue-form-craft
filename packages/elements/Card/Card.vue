<template>
  <ElCard v-bind="props">
    <FormItemGroup :children="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

defineProps<{
  props: Record<string, any>
  children: FormItemType[]
}>()
 
</script>