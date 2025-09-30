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
      @update="onUpdate"
    >
      <template #item="{ element: child }">
        <CanvasItem v-if="child.designKey" :data="child" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import Draggable from 'vuedraggable-es-fix'
import { useDesignInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import type { FormItemType } from '@/types'
import { ns } from '@/utils'
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

// 拖入后回调
const onAdd = (e: Record<string, any>) => {
  // console.log('onAdd')
  const source = e.item._underlying_vm_

  // 更新schema并记录到历史中
  designInstance.updateSchema(cloneDeep(designInstance.schema))

  // 将当前选中设置为新添加的表单项
  designInstance.updateCurrentKey(source.designKey)

  designInstance.hoverKey = source.designKey

  designInstance.rightTab = 'attr'

  designInstance.handleEmit('add', source)
}

// 排序后回调
const onUpdate = () => {
  // console.log('onUpdate')
  // 更新schema并记录到历史中
  designInstance.updateSchema(cloneDeep(designInstance.schema))
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
