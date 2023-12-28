<template>
  <component class="svg-icon" :is="icon" />
</template>

<script setup lang="jsx">
import { defineProps, shallowRef } from 'vue'

const props = defineProps({
  name: String
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
