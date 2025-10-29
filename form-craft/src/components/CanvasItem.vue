<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect(data)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div class="actions-lt" v-if="data.designKey === designInstance.current?.designKey">
      <div class="canvas-move" size="small" type="primary">
        <Icon name="move" />
      </div>
    </div>

    <div class="hidden-ico" v-if="data.hidden"><Icon name="hidden" /></div>

    <div class="actions-rb" v-if="data.designKey === designInstance.current?.designKey">
      <div
        class="actions-rb-item"
        v-for="{ icon, handle, bg, name } in rightBottomActions"
        @click.stop="handle(data)"
        :key="icon"
        :style="{ backgroundColor: bg }"
        :name="name"
      >
        <Icon :name="icon" />
      </div>
    </div>

    <div class="layout-title" v-if="config?.lbTitle">
      {{ config.title }}
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

const props = defineProps<{ data: FormItemType }>()

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
    bg: `var(--${ns('danger-color')})`,
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
  margin-bottom: 18px;
  position: relative;
  z-index: 2;

  @include ns('form-item') {
    margin-bottom: 0;
  }

  .actions-lt {
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 20;
    background-color: $themeColor;
    .canvas-move {
      font-size: 14px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      color: #fff;
      padding: 3px 11px;
      display: flex;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
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

  .actions-rb {
    position: absolute;
    right: 0;
    bottom: -1px;
    z-index: 20;
    color: #fff;
    list-style: none;
    padding: 1px;
    display: flex;

    &-item {
      padding: 4px;
      background-color: $themeColor;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      margin-left: 3px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      display: flex;
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .layout-title {
    position: absolute;
    right: -1px;
    top: -1px;
    padding: 1px 5px;
    background-color: $themeColor;
    font-size: 12px;
    color: #fff;
    z-index: 10;
    line-height: 16px;
  }
}

@include ns('canvas-item.hover') {
  border: 1px dashed $themeColor;
  padding: 1px;
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
  padding: 0;
}
</style>
