<template>
  <div :class="ns('canvas-group')" :style="{ overflowY: list.length ? 'auto' : 'hidden' }">
    <div
      v-if="!list.length"
      :class="ns('canvas-group-empty')"
      :style="{ fontSize: emptySize + 'px' }"
    >
      <div :class="ns('canvas-group-empty-ico')">
        <Icon name="add" />
      </div>
      <p>{{ emptyText }}</p>
    </div>

    <draggable
      :list="list"
      group="formDesign"
      itemKey="name"
      :ghost-class="ns('canvas-group-ghost')"
      :class="[ns('canvas-group-draggable'), props.class]"
      :style="style"
      :animation="300"
      handle=".canvas-move"
      force-fallback
      @add="onAdd"
    >
      <template #item="{ element: child }">
        <CanvasItem v-if="child.designKey" :data="child" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable-es-fix'
import { Icon } from '@/components'
import { useDesignInstance } from '@/hooks'
import { getCurrentByKey, ns } from '@/tools'
import type { FormItemType } from '@/types'
import CanvasItem from './CanvasItem.vue'

const props = withDefaults(
  defineProps<{
    list: FormItemType[]
    style?: any
    class?: string
    emptyText?: string
    emptySize?: number
  }>(),
  {
    emptyText: '请拖入子字段',
    emptySize: 12
  }
)

const designInstance = useDesignInstance()

const onAdd = (e: Record<string, any>) => {
  const source = e.item._underlying_vm_

  designInstance.updateCurrent(getCurrentByKey(designInstance.list, source.designKey)!)

  designInstance.hoverKey = source.designKey

  designInstance.rightTab = 'attr'

  designInstance.handleEmit('add', source)
}
</script>

<style lang="scss">
@import '@/style';

@include ns('canvas-group') {
  position: relative;
  height: 100%;
  width: 100%;
  &-empty {
    color: #999;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-50%);
    pointer-events: none;

    &-ico {
      margin-bottom: 5px;
    }
  }

  &-draggable {
    min-height: 150px;
    height: 100%;
  }

  &-ghost {
    list-style: none;
    text-align: center;
    margin: 5px 0;
    border: 1px dashed #c0bdbd;
    background-color: $lightThemeColor;
    border-radius: 7px;
    padding: 10px 0;
    min-width: 150px;
  }

  &-title {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
