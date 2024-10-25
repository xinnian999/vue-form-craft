<template>
  <FormRender design class="canvas" :schema="designInstance.schema">
    <div class="tip" v-if="!designInstance.list.length">
      <div class="ico">
        <icon-render name="add" />
      </div>
      <div class="text">{{ locale.canvas.emptyTip }}</div>
    </div>

    <draggable
      style="height: 100%"
      :list="designInstance.list"
      :group="{ name: 'formDesign', pull: true, put: true }"
      itemKey="name"
      chooseClass="choose"
      ghost-class="ghost"
      @add="designInstance.onAdd"
      drag-class="drag"
      handle=".canvas-move"
      :animation="300"
      force-fallback
    >
      <template #item="{ element }">
        <CanvasRender v-if="element.designKey" :data="element" />
      </template>
    </draggable>
  </FormRender>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable-es'
import { FormRender, IconRender } from '@vue-form-craft/components'
import CanvasRender from './CanvasRender.vue'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'

const designInstance = useDesignInstance()

const locale = useLocale()
</script>

<style lang="less">
.canvas {
  flex: 1;
  padding: 20px;
  border: 1px solid #c7c7c7;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  .tip {
    color: #999;
    font-size: 18px;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-50%);
    .ico {
      font-size: 30px;
      margin-bottom: 15px;
    }
  }

  .ghost {
    border-top: 5px solid rgb(248, 47, 47);
    list-style: none;
  }
}
</style>
