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
        v-for="{ icon, handle, bg } in rightBottomActions"
        @click.stop="handle(data)"
        :key="icon"
        :style="{ backgroundColor: bg }"
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
import type { FormItemType } from '@vue-form-craft/core'
import {
  copyItems,
  Icon,
  ns,
  recursionDelete,
  useDesignInstance,
  useElements,
  useGlobals
} from '@vue-form-craft/core'

const props = defineProps<{ data: FormItemType }>()

const designInstance = useDesignInstance()

const globals = useGlobals()

const elements = useElements()

const { FormItem } = globals

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
    bg: `var(--${ns('danger-color')})`,
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
