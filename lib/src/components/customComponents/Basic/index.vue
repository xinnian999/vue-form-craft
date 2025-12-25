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

// 使用 computed 包装 getter 方法，保持响应式
const currentKey = computed(() => designInstance.getCurrentKey())

const rootSchema = computed(() => {
  return { ...cloneDeep(initSchema), ...designInstance.getSchema() }
})

const currentNode = computed(() => {
  return designInstance.getNodeByKey(currentKey.value)
})

const currentElement = computed(() => {
  const node = designInstance.getNodeByKey(currentKey.value)
  return node ? elements[node.component] : null
})
</script>
