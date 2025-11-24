<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup style="min-height: 150px" :list="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

defineProps<{
  children: FormItemType[]
}>()
</script>
