<template>
  <a-card v-bind="$attrs">
    <FormItemGroup :list="children" />
  </a-card>
</template>

<script setup lang="ts">
import type { FormItemType } from '@form-magic/core'
import { FormItemGroup } from '@form-magic/core'

defineProps<{
  children: FormItemType[]
}>()
</script>
