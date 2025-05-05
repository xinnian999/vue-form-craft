<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <FormRender :class="ns('canvas')" v-model:schema="designInstance.schema" design />
  </div>
</template>

<script setup lang="ts">
import { ns } from '@vue-form-craft/core'
import Actions from './Actions/index.vue'
import FormRender from '@vue-form-craft/element-plus/form-render'
import { useDesignInstance } from '@vue-form-craft/element-plus/hooks'

const designInstance = useDesignInstance()
</script>
