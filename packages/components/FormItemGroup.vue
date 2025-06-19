<template>
  <CanvasGroup v-if="formInstance.design" :list="list" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import type { FormItemType } from '@form-magic/core'
import { useFormInstance } from '@form-magic/core'
import CanvasGroup from './CanvasGroup.vue'
import FormItem from './FormItem.vue'

defineProps<{
  list: FormItemType[]
}>()

const formInstance = useFormInstance()
</script>
