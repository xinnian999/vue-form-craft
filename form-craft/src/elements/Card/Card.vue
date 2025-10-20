<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup v-model="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const children = defineModel<FormItemType[]>({
  default: () => []
})
</script>
