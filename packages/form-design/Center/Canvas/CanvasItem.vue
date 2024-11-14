<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect(data)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div
      class="actions-lt"
      v-if="data.designKey === designInstance.current?.designKey"
    >
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

    <form-item v-bind="data" :props="checkProps(data.props)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash'
import { FormItem } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'
import { useDesignInstance, useElements } from '@vue-form-craft/hooks'
import Icon from '@vue-form-craft/icons'
import { ns } from '@vue-form-craft/utils'

const props = defineProps<{ data: FormItemType }>()

const designInstance = useDesignInstance()

const elements = useElements()

const config = elements[props.data.component]

const canvasItemClass = computed(() => ({
  [ns('canvas-item')]: true,
  active: props.data.designKey === designInstance.current?.designKey,
  hover: props.data.designKey === designInstance.hoverKey,
  mask: props.data.designKey === designInstance.hoverKey && !props.data.children
}))

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
    handle: designInstance.handleCopyItem
  },
  {
    icon: 'delete',
    bg: 'var(--el-color-danger)',
    handle: designInstance.handleDeleteItem
  }
]

const checkProps = (props: Record<string, any> = {}) => {
  return omit(props, ['multiple', 'api'])
}
</script>
