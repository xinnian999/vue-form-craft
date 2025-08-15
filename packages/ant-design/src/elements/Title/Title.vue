<template>
  <component :is="type" class="Title" :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{
    title
  }}</component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; type: string; italic: boolean }>(), {
  title: '标题',
  type: 'h3',
  italic: false
})
</script>
