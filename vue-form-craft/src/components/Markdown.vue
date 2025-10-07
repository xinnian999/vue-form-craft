<template>
  <div v-if="read || formInstance.read" :class="ns('md-preview')" :style="previewStyle">
    <MdPreview v-model="value" v-bind="$attrs" />
  </div>
  <MdEditor v-else v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { MdEditor, MdPreview } from 'md-editor-v3'
import { useFormInstance } from '@/hooks'
import 'md-editor-v3/lib/style.css'
import { ns } from '@/utils'

defineProps<{
  read?: boolean
  previewStyle?: any
}>()

const value = defineModel<string>()

const formInstance = useFormInstance()
</script>

<style lang="scss">
@import '@/style.scss';

@include ns('md-preview') {
  width: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;
}
</style>
