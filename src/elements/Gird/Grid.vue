<template>
  <div :style="gridStyle">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useStyle from '@/hooks/useStyle'

const props = defineProps({
  space: Number,
  colCount: Number
})
const gridStyle = useStyle('Grid', props)
</script>

<style></style>
