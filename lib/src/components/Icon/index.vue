<template>
  <component :class="ns('icon-render')" :is="icons[name]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import * as icons from './icons'

defineOptions({
  name: 'IconRender'
})

defineProps<{ name: keyof typeof icons }>()
</script>

<style lang="scss">
@import '@/style';

@include ns('icon-render') {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>
