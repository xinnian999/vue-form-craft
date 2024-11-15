<template>
  <CanvasGroup v-if="formInstance.design" :list="list" />
  <div v-else>
    <FormItem v-for="item in list" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@vue-form-craft/components'
import { CanvasGroup } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'
import { useFormInstance } from '@vue-form-craft/hooks'

defineProps<{
  list: FormItemType[]
}>()

const formInstance = useFormInstance()
</script>
