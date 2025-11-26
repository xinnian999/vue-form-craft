<template>
  <CanvasGroup v-if="formInstance.design" :list="list" :group="group" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { CanvasGroup, FormItem } from '@/components'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

defineProps<{
  group?: string
  list: FormItemType[]
}>()

const formInstance = useFormInstance()
</script>
