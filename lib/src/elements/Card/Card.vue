<template>
  <Card v-bind="$attrs">
    <FormItemGroup
      style="min-height: 150px"
      :list="formItemProps.items || []"
      :designKey="formItemProps.designKey!"
    />
  </Card>
</template>

<script setup lang="ts">
import { FormItemGroup } from '@/components'
import { useUI } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

const { Card } = useUI()

defineProps<ComponentBaseProps>()
</script>
