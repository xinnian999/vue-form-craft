<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <FormRender :class="ns('canvas')" v-model:schema="designInstance.schema" design />
  </div>
</template>

<script setup lang="ts">
import { ns } from '@form-magic/core'
import Actions from './Actions/index.vue'
import { FormRender } from '@/components'
import { useDesignInstance } from '@form-magic/core'

const designInstance = useDesignInstance()
</script>
