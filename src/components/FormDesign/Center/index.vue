<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <Canvas />
  </div>
</template>

<script setup lang="ts">
import { ns } from '@vue-form-craft/utils'
import Actions from './Actions/index.vue'
import Canvas from './Canvas/index.vue'
</script>

<style></style>
