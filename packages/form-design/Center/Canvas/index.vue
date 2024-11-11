<template>
  <FormRender :class="ns('canvas')" design :schema="designInstance.schema">
    <div :class="ns('canvas-empty')" v-if="!designInstance.list.length">
      <div :class="ns('canvas-empty-ico')">
        <Icon name="add" />
      </div>
      <p>{{ locale.canvas.emptyTip }}</p>
    </div>

    <draggable
      :class="ns('canvas-draggable')"
      :list="designInstance.list"
      :group="{ name: 'formDesign', pull: true, put: true }"
      itemKey="name"
      :ghost-class="ns('canvas-draggable-ghost')"
      @add="designInstance.onAdd"
      handle=".canvas-move"
      :animation="300"
      force-fallback
    >
      <template #item="{ element }">
        <CanvasRender v-if="element.designKey" :data="element" />
      </template>
    </draggable>
  </FormRender>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable-es'
import FormRender from '@vue-form-craft/form-render'
import CanvasRender from './CanvasRender.vue'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'
import { ns } from '@vue-form-craft/utils'
import Icon from '@vue-form-craft/icons'

const designInstance = useDesignInstance()

const locale = useLocale()
</script>
