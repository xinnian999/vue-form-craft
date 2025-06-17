<template>
  <div class="vfc-color-input">
    <el-input v-model="value" />
    <el-color-picker v-model="value" />
  </div>
</template>

<script setup lang="ts">
const value=defineModel<string>()
</script>

<style>
.vfc-color-input{
    display: flex;
}
</style>
