<template>
  <div id="CanvasWrapper">
    <div class="tip" v-if="!children.length">
      <div class="ico">
        <icon-render name="add" />
      </div>
      <div class="text">{{ locale.canvas.wrapperEmptyTip }}</div>
    </div>
    <draggable
      :list="children"
      group="formDesign"
      itemKey="name"
      chosenClass="active"
      ghost-class="ghost"
      class="childrenContainer"
      :animation="300"
      :style="style"
      @add="designInstance.onAdd"
    >
      <template #item="{ element: child }">
        <CanvasRender v-if="child.designKey" :data="child" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable-es'
import CanvasRender from './CanvasRender.vue'
import { IconRender } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/release'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'

defineProps<{
  children: FormItemType[],
  style?: any
}>()

const designInstance = useDesignInstance()

const locale = useLocale()
</script>

<style scoped lang="less">
#CanvasWrapper {
  position: relative;
  .tip {
    color: #999;
    font-size: 12px;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-50%);
    pointer-events: none;

    .ico {
      font-size: 15px;
      margin-bottom: 10px;
    }
  }
  .childrenContainer {
    min-height: 150px;
  }
}
</style>
