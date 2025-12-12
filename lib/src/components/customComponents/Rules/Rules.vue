<template>
  <FormRender v-model="value" :schema="schema" :class="ns('design-rules-config')" />
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()
</script>
