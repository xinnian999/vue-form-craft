<template>
  <MdPreview v-if="formInstance.read" v-model="value" v-bind="$attrs" />
  <MdEditor v-else v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { MdEditor, MdPreview } from 'md-editor-v3'
import { useFormInstance } from '@/hooks'
import 'md-editor-v3/lib/style.css'

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>
