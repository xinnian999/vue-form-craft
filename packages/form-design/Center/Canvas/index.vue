<template>
  <FormRender :class="ns('canvas')" design :schema="designInstance.schema">
    <CanvasWrapper :children="designInstance.list" :empty-text="locale.canvas.emptyTip" :empty-size="18"  />
  </FormRender>
</template>

<script setup lang="ts">
import FormRender from '@vue-form-craft/form-render'
import CanvasWrapper from './CanvasWrapper.vue'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'
import { ns } from '@vue-form-craft/utils'

const designInstance = useDesignInstance()

const locale = useLocale()
</script>
