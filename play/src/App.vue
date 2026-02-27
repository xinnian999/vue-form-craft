<template>
  <div class="layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
