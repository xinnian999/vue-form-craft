<template>
  <FormRender v-model="value" :schema="schema" />
</template>

<script setup lang="ts">
import schema from './schema'

const value = defineModel()
</script>
