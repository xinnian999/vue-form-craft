<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <FormRender :class="ns('canvas')" v-model:schema="designInstance.schema" design />
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance, ns } from '@form-magic/core'
import { FormRender } from '@form-magic/components'
import Actions from './Actions/index.vue'

const designInstance = useDesignInstance()
</script>
