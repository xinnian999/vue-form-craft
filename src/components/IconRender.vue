<template>
  <component id="icon-render" :is="icon" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { defineProps, shallowRef, defineOptions, watchEffect } from 'vue'

defineOptions({
  name: 'IconRender'
})

const props = defineProps({
  name: String
})

const icon = shallowRef(null)

watchEffect(() => {
  import(`@/assets/icons/${props.name}.vue`).then((module) => {
    icon.value = module.default
  })
})
</script>

<style scoped>
#icon-render {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  /* vertical-align: -0.15em; */
  fill: currentColor;
}
</style>
