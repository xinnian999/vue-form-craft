<template>
  <CanvasGroup v-if="formInstance.design" v-model="children" />

  <div v-else>
    <FormItem v-for="item in children" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { CanvasGroup, FormItem } from '@/components'
import { useChildrenModel, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children?: FormItemType[]
  designKey: string
}>()

const formInstance = useFormInstance()
const children = useChildrenModel(props)
</script>
