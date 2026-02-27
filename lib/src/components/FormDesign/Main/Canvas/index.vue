<template>
  <div :class="ns('form-design-center')">
    <div
      class="form-design-canvas"
      @mousemove="handleCanvasMouseMove"
      @mouseleave="handleCanvasMouseLeave"
      @click="handleCanvasClick"
    >
      <div
        v-if="currentKey === 'root' || hoverKey === 'root'"
        class="fd-form-title"
        :style="{ opacity: currentKey === 'root' ? 1 : 0.5 }"
      >
        <Icon name="form" /> 表单
      </div>
      <FormRender
        :class="[
          'fd-form',
          {
            hover: hoverKey === 'root',
            active: currentKey === 'root'
          }
        ]"
        :schema="designInstance.getSchema()"
        design
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormRender, Icon } from '@/components'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'

const designInstance = useDesignInstance()!

// 使用 computed 包装 getter 方法，保持响应式
const currentKey = computed(() => designInstance.getCurrentKey())
const hoverKey = computed(() => designInstance.getHoverKey())

const handleCanvasMouseMove = () => {
  designInstance.setHoverKey('root')
}

const handleCanvasMouseLeave = () => {
  designInstance.setHoverKey('')
}

const handleCanvasClick = () => {
  designInstance.setCurrentKey('root')
}
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-center') {
  flex: 1;
  overflow: hidden;
  border-right: 1px solid $borderColor;
  display: flex;
  flex-direction: column;
  background-color: $bgColorLight;

  .form-design-canvas {
    flex: 1;
    margin: 10px;
    position: relative;
    overflow-y: hidden;
    overflow-x: auto;
    .fd-form-title {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      background-color: $themeColor;
      box-sizing: border-box;
      gap: 3px;
      font-size: 12px;
      border-radius: 3px;
      padding: 2px 5px;
      color: #fff;
    }

    .fd-form {
      background-color: $bgColor;
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      margin: 0 auto;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
      }

      &.hover {
        background-color: $lightThemeColor;

        &::after {
          border-color: $themeColor;
          border-style: dashed;
          border-width: 1px;
          z-index: 10;
        }
      }

      &.active {
        &::after {
          border-color: $themeColor;
          border-style: solid;
          border-width: 2px;
          z-index: 15;
        }
      }
    }
  }
}
</style>
