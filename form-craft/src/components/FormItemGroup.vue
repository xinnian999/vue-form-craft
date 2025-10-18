<template>
  <CanvasGroup v-if="formInstance.design" v-model="modelValue" />

  <div v-else>
    <FormItem v-for="item in modelValue" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { CanvasGroup, FormItem } from '@/components'
import { useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const formInstance = useFormInstance()

const modelValue = defineModel<FormItemType[]>({
  default: () => []
})
</script>
