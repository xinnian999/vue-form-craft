<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup :list="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@form-magic/components'
import type { FormItemType } from '@form-magic/core'

defineProps<{
  children: FormItemType[]
}>()
 
</script>