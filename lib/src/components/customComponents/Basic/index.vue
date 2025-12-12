<template>
  <FormRender
    v-model="value"
    :schema="schema"
    :schemaContext="{ rootSchema, currentNode, currentElement }"
    :class="ns('design-basic-config')"
  />
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { computed } from 'vue'
import { initSchema } from '@/config'
import { useDesignInstance, useElements } from '@/hooks'
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()

const designInstance = useDesignInstance()!

const elements = useElements()

const rootSchema = computed(() => {
  return { ...cloneDeep(initSchema), ...designInstance.getSchema() }
})

const currentNode = computed(() => {
  return designInstance.getNodeByKey(designInstance.currentKey)
})

const currentElement = computed(() => {
  const node = designInstance.getNodeByKey(designInstance.currentKey)
  return node ? elements[node.component] : null
})
</script>
