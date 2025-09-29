<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <div :class="ns('form-design-center-canvas')">
      <FormRender v-model:schema="designInstance.schema" design />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/tools'
import Actions from './Actions/index.vue'

const designInstance = useDesignInstance()
</script>
