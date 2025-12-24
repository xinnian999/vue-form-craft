<template>
  <div
    :class="[canvasItemClass, data.designKey]"
    @click.stop="handleSelect(data)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <!-- 左上角的move按钮 -->
    <!-- <div class="move-btn">
      <Icon name="move" />
    </div> -->

    <!-- 右下角的其他按钮 -->
    <div class="actions">
      <div class="componentName">
        <ElementIcon :icon="config.icon" />
        {{ config.title }}
      </div>
      <div
        :class="['actions-item', name]"
        v-for="{ icon, handle, name } in rightBottomActions"
        @click.stop="handle && handle(data)"
        :key="icon"
      >
        <Icon :name="icon" />
      </div>
    </div>

    <FormItem v-bind="data" :props="data.props" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@/components'
import { useDesignInstance, useElements } from '@/hooks'
import type { FormItemType } from '@/types'
import { copyItems, ns, recursionDelete } from '@/utils'
import ElementIcon from '../../ElementIcon'
import FormItem from './FormItem.vue'

const props = defineProps<{ data: FormItemType; index: number }>()

const designInstance = useDesignInstance()!

const elements = useElements()

const config = computed(() => {
  // if (!props.data.component) return {}
  return (
    elements[props.data.component] || {
      title: '未知组件',
      icon: 'help'
    }
  )
})

const canvasItemClass = computed(() => {
  return {
    [ns('canvas-item')]: true,
    active: props.data.designKey === designInstance.currentKey,
    hover: props.data.designKey === designInstance.hoverKey,
    mask: props.data.designKey === designInstance.hoverKey && !props.data.children
  }
})

const handleHoverEnter = () => {
  if (props.data.designKey) {
    designInstance.setHoverKey(props.data.designKey)
  }
}

const handleHoverLeave = () => {
  designInstance.setHoverKey('')
}

const handleSelect = (element: FormItemType) => {
  designInstance.setCurrentKey(element.designKey!)
}

const rightBottomActions = [
  {
    icon: 'move',
    name: 'move-btn'
  },
  {
    icon: 'copy',
    name: 'copy-btn',
    handle: (element: FormItemType) => {
      const schema = designInstance.getSchema()
      const newList = copyItems(schema.items!, element.designKey!)
      designInstance.setSchema({ ...schema, items: newList })
      designInstance.recordHistory(`复制表单项-${element.label || element.name}`)
    }
  },
  {
    icon: 'delete',
    name: 'delete-btn',
    handle: (element: FormItemType) => {
      const schema = designInstance.getSchema()
      const newList = recursionDelete(schema.items!, (item) => item.designKey !== element.designKey)
      designInstance.setSchema({ ...schema, items: newList })
      designInstance.recordHistory(`删除表单项-${element.label || element.name}`)
    }
  }
]
</script>

<style lang="scss">
@import '@/style';
@include ns('canvas-item') {
  padding-bottom: 0.1px;
  padding-top: 0.1px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  .hidden-ico {
    position: absolute;
    left: -1px;
    bottom: -1px;
    z-index: 10;
    padding: 0px 5px;
    font-size: 13px;
    background-color: $themeColor;
    color: #fff;
  }

  /* .move-btn {
    position: absolute;
    left: 1px;
    top: 1px;
    z-index: 20;
    color: #fff;
    padding: 3px 5px;
    background-color: $themeColor;
    cursor: move;
    display: none;
    font-size: 12px;
    &:hover {
      opacity: 0.8;
    }
  } */

  .actions {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
    color: #fff;
    list-style: none;
    padding: 1px;
    display: flex;
    font-size: 12px;
    gap: 3px;
    visibility: hidden;
    max-height: 20px;

    .componentName {
      display: flex;
      align-items: center;
      background-color: $themeColor;
      box-sizing: border-box;
      gap: 3px;
      font-size: 10px;
      border-radius: 3px;
      padding: 2px 5px;
    }

    &-item {
      padding: 3px;
      background-color: $themeColor;
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}

@include ns('canvas-item.mask') {
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

@include ns('canvas-item.hover') {
  background-color: $lightThemeColor;

  &::after {
    border-color: $themeColor;
    border-style: dashed;
    border-width: 1px;
    z-index: 10;
  }

  & > .actions {
    visibility: visible;
    .componentName {
      opacity: 0.5;
    }
    .actions-item {
      display: none;
    }
  }
}

@include ns('canvas-item.active') {
  &::after {
    border-color: $themeColor;
    border-style: solid;
    border-width: 2px;
    z-index: 15;
  }

  & > .move-btn {
    display: flex;
  }

  & > .actions {
    visibility: visible;
    .actions-item {
      display: flex;
    }
    .componentName {
      opacity: 1;
    }
  }
}
</style>
