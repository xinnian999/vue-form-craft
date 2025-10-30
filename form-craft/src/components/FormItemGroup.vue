<template>
  <CanvasGroup v-if="formInstance.design" v-model="childrenModel" />

  <div v-else>
    <FormItem v-for="item in childrenModel" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { CanvasGroup, FormItem } from '@/components'
import { useChildrenModel, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children?: FormItemType[]
  designKey?: string
}>()

const formInstance = useFormInstance()

const childrenModel = useChildrenModel(props)
</script>
