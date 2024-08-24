<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect(data)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div class="actions-left-top" v-if="data.designKey === current.designKey">
      <div class="canvas-move" size="small" type="primary">
        <icon-render name="move" />
      </div>
    </div>

    <div class="hidden-ico" v-if="data.hidden"><icon-render name="hidden" /></div>

    <ul class="actions-right-bottom" v-if="data.designKey === current.designKey">
      <li v-for="{ icon, handle } in rightBottomActions" @click.stop="handle(data)" :key="icon">
        <icon-render :name="icon" />
      </li>
    </ul>

    <form-item v-bind="data" :props="checkProps(data.props)" design />
  </div>
</template>

<script setup>
import { defineProps, inject, computed } from 'vue'
import { omit } from 'lodash'
import { FormItem ,IconRender} from '@/components'
import { $current, $methods, $hoverKey } from '@/config/symbol'

const props = defineProps({
  data: Object
})

const { current, updateCurrent } = inject($current)

const { hoverKey, updateHoverKey } = inject($hoverKey)

const { handleDeleteItem, handleCopyItem } = inject($methods)

const canvasItemClass = computed(() => ({
  'canvas-item': true,
  active: props.data.designKey === current.value.designKey,
  hover: props.data.designKey === hoverKey.value,
  mask: props.data.designKey === hoverKey.value && !props.data.children
}))

const handleHoverEnter = () => {
  updateHoverKey(props.data.designKey)
}

const handleHoverLeave = () => {
  updateHoverKey(null)
}

const handleSelect = (element) => {
  updateCurrent(element)
}

const rightBottomActions = [
  {
    icon: 'copy',
    handle: handleCopyItem
  },
  {
    icon: 'delete',
    handle: handleDeleteItem
  }
]

const checkProps = (props) => {
  return omit(props, ['multiple', 'api'])
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
      line-height: 16px;
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
