<template><MdEditor class="markdown" v-model="text" /></template>

<script setup lang="jsx">
import { MdEditor } from 'md-editor-v3'
import { ref } from 'vue'
import 'md-editor-v3/lib/style.css'

const text = ref('Hello Editor!')
</script>

<style>
.markdown {
  height: 100%;
}
</style>
