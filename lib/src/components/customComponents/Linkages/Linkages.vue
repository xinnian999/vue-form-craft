<template>
  <FormRender
    v-model="value"
    :schema="schema"
    :schemaContext="{ nodeOptions }"
    :class="ns('design-linkages-config')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import { ns } from '@/utils'
import schema from './schema'

const value = defineModel()

const designInstance = useDesignInstance()

const nodeOptions = computed(() => {
  if (!designInstance) return []

  const rootNodes = designInstance.getSchema().items || []

  const options: { label: string; value: string }[] = []

  const getNodes = (nodes: FormItemType[]) => {
    nodes.forEach((node) => {
      options.push({
        label: node.label || node.name,
        value: node.name
      })

      if (node.children) {
        getNodes(node.children)
      }
    })
  }

  getNodes(rootNodes)

  return options
})
</script>
