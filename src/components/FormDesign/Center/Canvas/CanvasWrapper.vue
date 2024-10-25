<template>
  <div :class="namespace('canvas-group')">
    <div :class="namespace('canvas-group-empty')" v-if="!children.length">
      <div :class="namespace('canvas-group-empty-ico')">
        <icon-render name="add" />
      </div>
      <p>{{ locale.canvas.wrapperEmptyTip }}</p>
    </div>
    <draggable
      :list="children"
      group="formDesign"
      itemKey="name"
      chosenClass="active"
      ghost-class="ghost"
      :class="namespace('canvas-group-draggable')"
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
import { namespace } from '@vue-form-craft/utils'

defineProps<{
  children: FormItemType[],
  style?: any
}>()

const designInstance = useDesignInstance()

const locale = useLocale()
</script>
