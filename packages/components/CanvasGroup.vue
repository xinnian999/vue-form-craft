<template>
  <div :class="ns('canvas-group')" :style="{ overflow: list.length ? 'auto' : 'hidden' }">
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
import CanvasItem from './CanvasItem.vue'
import Icon from '@vue-form-craft/icons'
import type { FormItemType } from '@vue-form-craft/types'
import { useDesignInstance } from '@vue-form-craft/hooks'
import { getCurrentByKey, ns } from '@vue-form-craft/utils'

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
  const source = e.item.__draggable_context.element

  designInstance.updateCurrent(getCurrentByKey(designInstance.list, source.designKey)!)

  designInstance.hoverKey = source.designKey

  designInstance.rightTab = 'attr'

  designInstance.handleEmit('add', source)
}
</script>
