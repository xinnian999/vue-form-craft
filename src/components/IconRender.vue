<template>
  <component class="svg-icon" :is="icon" :style="{ color }" />
</template>

<script setup lang="jsx">
import { defineProps, shallowRef, defineOptions } from 'vue'

defineOptions({
  name: 'IconRender'
})

const props = defineProps({
  name: String,
  color: {
    type: String,
    default: ''
  }
})

const icon = shallowRef(null)

import(`../icons/${props.name}.vue`).then((module) => {
  icon.value = module.default
})
</script>

<style>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
