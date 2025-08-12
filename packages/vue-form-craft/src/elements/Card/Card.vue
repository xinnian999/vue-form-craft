<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup :list="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@vue-form-craft/types'

defineProps<{
  children: FormItemType[]
}>()
 
</script>