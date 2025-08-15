<template>
  <div class="fm-color-input">
    <a-input v-model="value" />
    <a-color-picker v-model="value" />
  </div>
</template>

<script setup lang="ts">
const value=defineModel<string>()
</script>

<style>
.fm-color-input{
    display: flex;
}
</style>
