<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup :designKey="designKey" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'

defineProps<{
  designKey: string
}>()
</script>
