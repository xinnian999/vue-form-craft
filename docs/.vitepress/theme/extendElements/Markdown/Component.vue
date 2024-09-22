<template>
  <MdEditor v-model="value" />
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const value = defineModel<string>()
</script>
