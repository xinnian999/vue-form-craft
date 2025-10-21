<template>
  <div :class="ns('form-design-center')">
    <Actions />
    <div :class="ns('form-design-center-canvas')">
      <FormRender :schema="schema" design />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'
import Actions from './Actions/index.vue'

const designInstance = useDesignInstance()

const schema = computed({
  get() {
    return designInstance.schema
  },
  set(value) {
    designInstance.setSchema(value)
  }
})
</script>
