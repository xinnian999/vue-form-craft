<template>
  <FormRender design class="canvas" :schema="schema">
    <div class="tip" v-if="!schema.items.length">
      <div class="ico">
        <icon-render name="add" />
      </div>
      <div class="text">{{ locale.canvas.emptyTip }}</div>
    </div>

    <draggable
      style="height: 100%"
      :list="schema.items"
      :group="{ name: 'formDesign', pull: true, put: true }"
      itemKey="name"
      chooseClass="choose"
      ghost-class="ghost"
      @add="onAdd"
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
import { inject } from 'vue'
import draggable from 'vuedraggable-es'
import { FormRender,IconRender } from '@vue-form-craft/components'
import { $schema, $methods, $locale } from '@vue-form-craft/config/symbol'
import CanvasRender from './CanvasRender.vue'

const { schema } = inject($schema)!

const { onAdd } = inject($methods)!

const locale = inject($locale)!
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
