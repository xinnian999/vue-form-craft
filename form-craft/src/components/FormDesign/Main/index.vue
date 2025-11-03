<template>
  <div :class="ns('form-design-main')">
    <Header />

    <div :class="ns('form-design-main-content')">
      <Canvas />
      <AttrPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import AttrPanel from './AttrPanel/index.vue'
import Canvas from './Canvas/index.vue'
import Header from './Header/index.vue'
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-main') {
  flex: 1;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;

  &-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
</style>
