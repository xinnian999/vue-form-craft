<template>
  <div class="vfc-color-input">
    <a-input v-model="value" />
    <a-color-picker v-model="value" />
  </div>
</template>

<script setup lang="ts">
const value = defineModel<string>()
</script>

<style>
.vfc-color-input {
  display: flex;
}
</style>
