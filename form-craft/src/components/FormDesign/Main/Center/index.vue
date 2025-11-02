<template>
  <div :class="ns('form-design-center')">
    <div
      class="form-design-canvas"
      @mousemove="handleCanvasMouseMove"
      @mouseleave="handleCanvasMouseLeave"
      @click="handleCanvasClick"
    >
      <FormRender
        :class="[
          'fd-form',
          {
            hover: designInstance.hoverKey === 'root',
            active: designInstance.currentKey === 'root'
          }
        ]"
        :schema="designInstance.getSchema()"
        design
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'

const designInstance = useDesignInstance()!

const handleCanvasMouseMove = () => {
  designInstance.updateHoverKey('root')
}

const handleCanvasMouseLeave = () => {
  designInstance.updateHoverKey('')
}

const handleCanvasClick = () => {
  designInstance.updateCurrentKey('root')
}
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

  .form-design-canvas {
    flex: 1;
    margin: 10px;
    position: relative;
    overflow-y: hidden;
    overflow-x: auto;
    .fd-form {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      margin: 0 auto;
      border: 2px solid transparent;

      &.hover {
        border: 2px dashed $themeColor;
        background-color: $lightThemeColor;
      }

      &.active {
        border: 2px solid $themeColor;
      }
    }
  }
}
</style>
