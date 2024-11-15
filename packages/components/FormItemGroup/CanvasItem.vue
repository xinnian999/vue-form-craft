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

    <ul class="actions-rb" v-if="data.designKey === designInstance.current?.designKey">
      <li
        class="actions-rb-item"
        v-for="{ icon, handle, bg } in rightBottomActions"
        @click.stop="handle(data)"
        :key="icon"
        :style="{ backgroundColor: bg }"
      >
        <Icon :name="icon" />
      </li>
    </ul>

    <div
      class="layout-title"
      v-if="config.type === 'layout' && designInstance.currentKey === data.designKey"
    >
      {{ config.title }}
    </div>

    <form-item v-bind="data" :props="data.props" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormItem from './FormItem.vue'
import type { FormItemType } from '@vue-form-craft/types'
import { useDesignInstance, useElements } from '@vue-form-craft/hooks'
import Icon from '@vue-form-craft/icons'
import { copyItems, ns, recursionDelete } from '@vue-form-craft/utils'

const props = defineProps<{ data: FormItemType }>()

const designInstance = useDesignInstance()

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
  designInstance.updateCurrent(element)
  designInstance.rightTab = 'attr'
}

const rightBottomActions = [
  {
    icon: 'copy',
    handle: (element: FormItemType) => {
      const newList = copyItems(designInstance.list, element.designKey!)
      designInstance.updateList(newList)
    }
  },
  {
    icon: 'delete',
    bg: 'var(--el-color-danger)',
    handle: (element: FormItemType) => {
      const newList = recursionDelete(
        designInstance.list,
        (item) => item.designKey !== element.designKey
      )
      designInstance.updateList(newList)
    }
  }
]
</script>
