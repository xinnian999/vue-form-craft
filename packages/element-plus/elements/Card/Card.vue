<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup :list="children" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@vue-form-craft/element-plus/components'
import type { FormItemType } from '@vue-form-craft/element-plus/types'

defineProps<{
  children: FormItemType[]
}>()
 
</script>