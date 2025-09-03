<template>
  <div :class="ns('form-design-center')">
    <Actions :class="ns('form-design-center-actions')" />
    <FormRender
      :class="ns('form-design-center-canvas')"
      v-model:schema="designInstance.schema"
      design
    />
  </div>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { ns, useDesignInstance } from '@form-magic/core'
import Actions from './Actions/index.vue'

const designInstance = useDesignInstance()
</script>
