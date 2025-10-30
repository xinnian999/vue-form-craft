<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect(data)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div class="hidden-ico" v-if="data.hidden"><Icon name="hidden" /></div>

    <div :class="['actions', { 'actions-first': index === 0 }]">
      <div class="componentName">
        <component :is="config.icon" />
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
import { useDesignInstance, useElements } from '@/hooks'
import Icon from '@/Icon/index.vue'
import type { FormItemType } from '@/types'
import { copyItems, ns, recursionDelete } from '@/utils'
import FormItem from './FormItem.vue'

const props = defineProps<{ data: FormItemType; index: number }>()

const designInstance = useDesignInstance()!

const elements = useElements()

const config = elements[props.data.component]

const canvasItemClass = computed(() => {
  return {
    [ns('canvas-item')]: true,
    active: props.data.designKey === designInstance.current?.designKey,
    hover: props.data.designKey === designInstance.hoverKey,
    mask: props.data.designKey === designInstance.hoverKey && !props.data.children
  }
})

const handleHoverEnter = () => {
  if (props.data.designKey) {
    designInstance.updateHoverKey(props.data.designKey)
  }
}

const handleHoverLeave = () => {
  designInstance.updateHoverKey('')
}

const handleSelect = (element: FormItemType) => {
  designInstance.updateCurrentKey(element.designKey!)
  designInstance.rightTab = 'attr'
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
      const newList = copyItems(schema.items, element.designKey!)
      designInstance.applySchema({ ...schema, items: newList })
    }
  },
  {
    icon: 'delete',
    name: 'delete-btn',
    handle: (element: FormItemType) => {
      const schema = designInstance.getSchema()
      const newList = recursionDelete(schema.items, (item) => item.designKey !== element.designKey)
      designInstance.applySchema({ ...schema, items: newList })
    }
  }
]
</script>

<style lang="scss">
@import '@/style';
@include ns('canvas-item') {
  border: 2px solid transparent;
  padding-bottom: 0.1px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;

  // @include ns('form-item') {
  //   margin-bottom: 0;
  // }

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
    display: none;

    .componentName {
      display: flex;
      align-items: center;
      background-color: $themeColor;
      box-sizing: border-box;
      gap: 3px;
      font-size: 10px;
      border-radius: 3px;
      padding: 0 3px;
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

@include ns('canvas-item.hover') {
  border: 2px dashed $themeColor;
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

@include ns('canvas-item.active') {
  border: 2px solid $themeColor !important;

  & > .actions {
    display: flex;
  }
}
</style>
