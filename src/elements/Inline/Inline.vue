<template>
  <div :style="InlineStyle">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useStyle from '@/hooks/useStyle'

const props = defineProps({
  align: String,
  margin: Number,
  autoWrap: Boolean
})
const InlineStyle = useStyle('Inline', props)
</script>

<style></style>
