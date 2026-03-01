<template>
  <FormRender v-model="value" :schema="schemaData" :class="ns('design-options-config')" />
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import type { FormSchema } from '@/types'
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel<FormSchema>()

const schemaData = schema
</script>
