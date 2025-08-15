<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <FormRender :class="ns('canvas')" v-model:schema="designInstance.schema" design />
  </div>
</template>

<script setup lang="ts">
import { tools } from '@magic-form/core'
import Actions from './Actions/index.vue'
import { FormRender } from '@/components'
import { useDesignInstance } from '@magic-form/core'

const { ns } = tools

const designInstance = useDesignInstance()
</script>
