<template>
  <FormRender
    v-model="value"
    :schema="schema"
    :schemaContext="{ rootSchema, currentNode }"
    :class="ns('design-basic-config')"
  />
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { computed } from 'vue'
import { initSchema } from '@/config'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()

const designInstance = useDesignInstance()!

const rootSchema = computed(() => {
  return { ...cloneDeep(initSchema), ...designInstance.getSchema() }
})

const currentNode = computed(() => {
  return designInstance.getNodeByKey(designInstance.currentKey)
})
</script>

<style lang="scss">
@import '@/style';

@include ns('design-basic-config') {
  width: 100%;
  @include ns('form-item') {
    margin-bottom: 18px !important;
  }
}
</style>
