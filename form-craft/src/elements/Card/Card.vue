<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup :children="children" :designKey="designKey" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

defineProps<{
  designKey: string
  children?: FormItemType[]
}>()
</script>
