<template>
  <component id="icon-render" :class="class" :is="icon" :style="{ color }" />
</template>

<script setup lang="jsx">
import { defineProps, shallowRef, defineOptions, watchEffect } from 'vue'

defineOptions({
  name: 'IconRender'
})

const props = defineProps({
  name: String,
  class: null,
  color: {
    type: String,
    default: ''
  }
})

const icon = shallowRef(null)

watchEffect(() => {
  import(`../icons/${props.name}.vue`).then((module) => {
    icon.value = module.default
  })
})
</script>

<style>
#icon-render {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  /* vertical-align: -0.15em; */
  fill: currentColor;
}
</style>
