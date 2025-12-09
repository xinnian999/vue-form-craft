<template>
  <div
    ref="scrollContainer"
    :class="ns('canvas-group')"
    :style="{ overflowY: list.length ? 'auto' : 'hidden' }"
  >
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
      handle=".move-btn"
      force-fallback
      :scroll="scrollContainer"
      :scroll-sensitivity="100"
      :scroll-speed="20"
      :bubble-scroll="true"
      @add="onAdd"
      @update="onUpdate"
    >
      <template #item="{ element: child, index }">
        <CanvasItem v-if="child.designKey" :data="child" :index="index" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Draggable from 'vuedraggable-es-fix'
import { Icon } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import { ns } from '@/utils'
import CanvasItem from './CanvasItem.vue'

const props = withDefaults(
  defineProps<{
    style?: any
    class?: string
    emptyText?: string
    emptySize?: number
    list: FormItemType[]
  }>(),
  {
    emptyText: '请拖入子字段',
    emptySize: 12,
    list: () => []
  }
)

const scrollContainer = ref<HTMLElement>()

const designInstance = useDesignInstance()!

// 拖入后回调
const onAdd = (e: Record<string, any>) => {
  const source = e.item._underlying_vm_

  // 将当前选中设置为新添加的表单项
  designInstance.setCurrentKey(source.designKey)

  designInstance.setHoverKey(source.designKey)

  designInstance.handleEmit('add', source)

  designInstance.recordHistory('拖拽组件')
}

const onUpdate = () => {
  designInstance.recordHistory('调整组件顺序')
}

// 暴露方法供测试使用：模拟拖拽添加
const simulateAdd = (item: FormItemType) => {
  // 先直接修改list（模拟draggable的行为）
  // eslint-disable-next-line vue/no-mutating-props
  props.list.push(item)

  // 如果list是根items，需要通过setSchema触发更新
  const schema = designInstance.getSchema()
  if (props.list === schema.items) {
    // 根画布：通过setSchema触发响应式更新
    designInstance.setSchema({ ...schema, items: [...props.list] })
  }

  // 触发拖拽后的副作用（和onAdd回调一样）
  designInstance.setCurrentKey(item.designKey!)
  designInstance.setHoverKey(item.designKey!)
  designInstance.handleEmit('add', item)
  designInstance.recordHistory('拖拽组件')
}

// 暴露方法供测试使用：模拟拖拽移除
const simulateRemove = (designKey: string) => {
  // 找到要移除的项的索引
  const index = props.list.findIndex((item) => item.designKey === designKey)
  if (index === -1) {
    throw new Error(`未找到designKey为 ${designKey} 的组件`)
  }

  // 直接修改list（模拟draggable的行为）
  // eslint-disable-next-line vue/no-mutating-props
  const removed = props.list.splice(index, 1)[0]

  // 如果list是根items，需要通过setSchema触发更新
  const schema = designInstance.getSchema()
  if (props.list === schema.items) {
    // 根画布：通过setSchema触发响应式更新
    designInstance.setSchema({ ...schema, items: [...props.list] })
  }

  return removed
}

defineExpose({
  simulateAdd,
  simulateRemove
})
</script>

<style lang="scss">
@import '@/style';

@include ns('canvas-group') {
  position: relative;
  height: 100%;
  width: 100%;

  // 滚动条悬浮样式
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  // Firefox 滚动条样式
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

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
    border: 1px dashed #c0bdbd;
    background-color: $lightThemeColor;
    border-radius: 7px;
    // min-width: 150px;
    margin-bottom: 18px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // gap: 5px;
    padding: 5px 0;
  }

  &-title {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
