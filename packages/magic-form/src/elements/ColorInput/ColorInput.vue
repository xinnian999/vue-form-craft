<template>
  <div class="mf-color-input">
    <el-input v-model="value" />
    <el-color-picker v-model="value" />
  </div>
</template>

<script setup lang="ts">
const value=defineModel<string>()
</script>

<style>
.mf-color-input{
    display: flex;
}
</style>
