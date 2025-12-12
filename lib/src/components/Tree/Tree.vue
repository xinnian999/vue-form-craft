<template>
  <div :class="ns('tree')">
    <TreeNode
      v-for="node in data"
      :key="node[nodeKey]"
      :node="node"
      :nodeKey="nodeKey"
      :currentKey="currentKey"
      :level="0"
      :defaultExpandAll="defaultExpandAll"
      :expandOnClickNode="expandOnClickNode"
      @node-click="handleNodeClick"
    >
      <template #default="slotProps">
        <slot name="default" v-bind="slotProps"></slot>
      </template>
    </TreeNode>
  </div>
</template>

<script setup lang="ts">
import { ns } from '@/utils'
import TreeNode from './TreeNode.vue'

const props = withDefaults(
  defineProps<{
    data?: any[]
    nodeKey?: string
    currentKey?: string | number
    defaultExpandAll?: boolean
    expandOnClickNode?: boolean
  }>(),
  {
    data: () => [],
    nodeKey: 'id',
    defaultExpandAll: false,
    expandOnClickNode: true
  }
)

const emit = defineEmits(['node-click', 'update:currentKey'])

const handleNodeClick = (node: any) => {
  emit('update:currentKey', node[props.nodeKey])
  emit('node-click', node)
}
</script>

<style lang="scss">
@import '@/style';

@include ns('tree') {
  position: relative;
  overflow: hidden;
}
</style>
