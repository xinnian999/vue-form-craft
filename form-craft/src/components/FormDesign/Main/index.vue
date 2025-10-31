<template>
  <div :class="ns('form-design-main')">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import Center from './Center/index.vue'
import Left from './Left/index.vue'
import Right from './Right/index.vue'
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-main') {
  flex: 1;
  overflow: hidden;
  width: 100%;
  display: flex;
}
</style>
