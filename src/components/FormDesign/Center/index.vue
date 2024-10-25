<template>
  <div :class="namespace('form-design-canvas')">
    <Actions />
    <Canvas />
  </div>
</template>

<script setup lang="ts">
import { namespace } from '@vue-form-craft/utils'
import Actions from './Actions/index.vue'
import Canvas from './Canvas/index.vue'
</script>

<style></style>
