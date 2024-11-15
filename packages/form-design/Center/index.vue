<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <FormRender :class="ns('canvas')" v-model:schema="designInstance.schema" design />
  </div>
</template>

<script setup lang="ts">
import { ns } from '@vue-form-craft/utils'
import Actions from './Actions/index.vue'
import FormRender from '@vue-form-craft/form-render'
import { useDesignInstance } from '@vue-form-craft/hooks'

const designInstance = useDesignInstance()
</script>
