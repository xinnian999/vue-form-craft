<template>
  <FormRender :class="namespace('form-design-canvas-form')" design :schema="designInstance.schema">
    <div :class="namespace('form-design-canvas-form-tip')" v-if="!designInstance.list.length">
      <div :class="namespace('form-design-canvas-form-tip-ico')">
        <icon-render name="add" />
      </div>
      <p>{{ locale.canvas.emptyTip }}</p>
    </div>

    <draggable
      style="height: 100%"
      :list="designInstance.list"
      :group="{ name: 'formDesign', pull: true, put: true }"
      itemKey="name"
      :ghost-class="namespace('form-design-canvas-form-ghost')"
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
import { FormRender, IconRender } from '@vue-form-craft/components'
import CanvasRender from './CanvasRender.vue'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'
import { namespace } from '@vue-form-craft/utils'

const designInstance = useDesignInstance()

const locale = useLocale()
</script>
