<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect({ ...thisProps })"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div class="actions-left-top" v-if="onlyId === current.onlyId">
      <div class="canvas-move" size="small" type="primary">
        <icon-render name="move" />
      </div>
    </div>

    <div class="hidden-ico" v-if="hidden"><icon-render name="hidden" /></div>

    <ul class="actions-right-bottom" v-if="onlyId === current.onlyId">
      <li
        v-for="{ icon, handle } in rightBottomActions"
        @click.stop="handle(thisProps)"
        :key="icon"
      >
        <icon-render :name="icon" />
      </li>
    </ul>

    <div v-if="currentComponentConfig.isDefaultWrapper" class="default">
      <div class="title">【{{ currentComponentConfig.name }}】 {{ label }} {{ name }}</div>
      <CanvasWrapper v-bind="thisProps" />
    </div>

    <component
      v-else-if="currentComponentConfig.isWrapper"
      :is="currentComponentConfig.component"
      v-bind="props"
      design
    >
      <CanvasWrapper v-bind="thisProps" />
    </component>

    <form-item v-else v-bind="thisProps" :props="checkProps(props)" :hidden="false" design />
  </div>
</template>

<script setup>
import { defineProps, inject, computed } from 'vue'
import { omit } from 'lodash'
import { ElButton } from 'element-plus'
import { copyItems, deleteItem } from '@/utils'
import { FormItem } from '@/components'
import CanvasWrapper from './CanvasWrapper.vue'

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  props: Object,
  children: Array,
  onlyId: String,
  hideLabel: { type: Boolean, default: undefined },
  required: { type: Boolean, default: undefined },
  style: Object,
  help: String,
  class: null,
  hidden: Boolean
})

const elements = inject('$elements')

const current = inject('$current')

const hoverId = inject('hoverId')

const list = inject('$list')

const currentComponentConfig = computed(() => {
  return elements[thisProps.component] || {}
})

const canvasItemClass = computed(() => ({
  'canvas-item': true,
  active: thisProps.onlyId === current.value.onlyId,
  hover: thisProps.onlyId === hoverId.value,
  mask: thisProps.onlyId === hoverId.value && !thisProps.children
}))

const handleHoverEnter = () => {
  hoverId.value = thisProps.onlyId
}

const handleHoverLeave = () => {
  hoverId.value = ''
}

const handleSelect = (element) => {
  current.value = element
}

const rightBottomActions = [
  {
    icon: 'copy',
    handle: (element) => {
      list.value = copyItems(list.value, element.onlyId)
    }
  },
  {
    icon: 'delete',
    handle: (element) => {
      list.value = deleteItem(list.value, element.onlyId)
    }
  }
]

const checkProps = (props) => {
  return omit(props, ['multiple', 'autoSelectedFirst', 'api'])
}
</script>

<style scoped lang="less">
.canvas-item {
  border: 2px solid transparent;
  margin-bottom: 5px;
  padding: 10px;
  position: relative;
  z-index: 2;
  &::before {
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px dashed #c0bdbd;
  }

  .actions-left-top {
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 20;
    background-color: var(--el-color-primary);
    .canvas-move {
      font-size: 16px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      color: #fff;
      padding: 0 11px;
      line-height: 24px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .hidden-ico {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    padding: 0px 5px;
    font-size: 13px;
    background-color: var(--el-color-primary);
    color: #fff;
  }
  .actions-right-bottom {
    position: absolute;
    right: 0;
    bottom: -1px;
    z-index: 20;
    color: #fff;
    list-style: none;
    padding: 1px;
    display: flex;

    li {
      padding: 2px 4px;
      background-color: var(--el-color-primary);
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      margin-left: 3px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .default {
    border: 2px dashed var(--el-color-primary);
    margin: 10px;
    position: relative;
    padding: 5px;
    .title {
      position: absolute;
      left: 0;
      top: -20px;
      padding: 1px 5px;
      background-color: var(--el-color-primary);
      font-size: 12px;
      color: #fff;
      z-index: 10;
    }
  }

  .childContainer {
    min-height: 150px;
  }
}

.hover {
  border: 2px solid var(--el-color-primary-light-5);
  background-color: var(--el-color-primary-light-9);
}

.mask {
  &::before {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: '';
    background-color: transparent;
    z-index: 15;
  }
}

.active {
  border: 2px solid var(--el-color-primary) !important;

  &:hover {
    border: 2px solid var(--el-color-primary) !important;
  }
}
</style>
