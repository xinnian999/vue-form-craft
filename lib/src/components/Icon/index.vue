<template>
  <component :class="ns('icon-render')" :is="icons[name]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ns } from '@/utils'

const modules = import.meta.glob('./icons/*.vue', { eager: true })

const icons = Object.entries(modules).reduce(
  (acc, [key, value]) => {
    const fileName = key.split('/').pop()

    const newKey = fileName?.split('.')[0]!

    acc[newKey] = (value as Record<string, any>).default

    return acc
  },
  {} as Record<string, any>
)

defineOptions({
  name: 'IconRender'
})

defineProps<{ name: string }>()
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
