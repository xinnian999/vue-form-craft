<template>
  <CanvasGroup v-if="formInstance.design" :list="list" />

  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import type { FormItemType } from '@vue-form-craft/core'
import { useFormInstance, useGlobals, CanvasGroup } from '@vue-form-craft/core'

defineProps<{
  list: FormItemType[]
}>()

const formInstance = useFormInstance()

const { FormItem } = useGlobals()
</script>
