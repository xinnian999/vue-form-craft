<template>
  <component id="icon-render" :is="icons[name]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { defineProps,  defineOptions} from 'vue'

const modules = import.meta.glob('@/assets/icons/*.vue', { eager: true })

const icons = Object.entries(modules).reduce((acc, [key, value]) => {
  const fileName = key.split('/').pop()

  const newKey = fileName?.split('.')[0]

  acc[newKey]=value.default
  
  return acc
}, {})


defineOptions({
  name: 'IconRender'
})

defineProps({
  name: String
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
