<template>
  <FormRender v-model="value" :schema="schema" :class="ns('design-basic-config')" />
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()
</script>

<style lang="scss">
@import '@/style';

@include ns('design-basic-config') {
  width: 100%;
  @include ns('form-item') {
    margin-bottom: 18px !important;
  }
}
</style>
