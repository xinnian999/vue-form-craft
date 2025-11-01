<template>
  <div :class="ns('form-design-center')">
    <div :class="ns('form-design-center-canvas')">
      <FormRender :schema="designInstance.getSchema()" design />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'

const designInstance = useDesignInstance()!
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-center') {
  flex: 1;
  overflow: hidden;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  background-color: #eee;

  &-actions {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  &-canvas {
    flex: 1;
    margin: 10px;
    position: relative;
    overflow-y: hidden;
    overflow-x: auto;
    @include ns('form') {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
