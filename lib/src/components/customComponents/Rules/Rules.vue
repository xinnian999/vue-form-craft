<template>
  <FormRender v-model="value" :schema="schema" :class="ns('design-rules-config')" />
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()
</script>

<style lang="scss">
@import '@/style';

@include ns('design-rules-config') {
  @include ns('form-item') {
    margin-bottom: 18px !important;
  }
}
</style>
