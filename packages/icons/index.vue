<template>
  <component :class="ns('icon-render')" :is="icons[name]" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ns } from '@vue-form-craft/utils'

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
