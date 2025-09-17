<template>
  <a-card v-bind="$attrs">
    <FormItemGroup :list="children" />
  </a-card>
</template>

<script setup lang="ts">
import type { FormItemType } from '@vue-form-craft/core'
import { FormItemGroup } from '@vue-form-craft/core'

defineProps<{
  children: FormItemType[]
}>()
</script>
