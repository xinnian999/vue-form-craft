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

<style lang="scss">
@import '@/style';

@include ns('design-options-config') {
  width: 100%;
  @include ns('form-item') {
    margin-bottom: 18px;
  }
}
</style>
