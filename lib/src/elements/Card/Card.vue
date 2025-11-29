<template>
  <ElCard v-bind="$attrs">
    <FormItemGroup style="min-height: 150px" :list="formItemProps.children || []" />
  </ElCard>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import type { ComponentBaseProps } from '@/types'

defineProps<ComponentBaseProps>()
</script>
