<template>
  <component :class="ns('icon-render')" :is="iconComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ns } from '@/utils'
import * as icons from './icons'

defineOptions({
  name: 'IconRender'
})

const props = defineProps<{ name: string }>()

const iconComponent = computed(() => (icons as Record<string, any>)[props.name])
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
