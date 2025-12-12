<template>
  <div :class="ns('outline')">
    <Tree
      :data="treeData"
      node-key="designKey"
      :current-key="currentNodeKey"
      :default-expand-all="true"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <template #default="{ data }">
        <div class="tree-node">
          <ElementIcon :icon="data.icon" class="node-icon" />
          <span class="node-label">{{ data.label }}</span>
        </div>
      </template>
    </Tree>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { ElementIcon, Icon, Tree } from '@/components'
import { useDesignInstance, useElements } from '@/hooks'
import type { FormItemType } from '@/types'
import { ns } from '@/utils'

const designInstance = useDesignInstance()
const elements = useElements()

// 递归构建树形数据
const buildTreeData = (items: FormItemType[] = []): any[] => {
  return items.map((item) => {
    const element = elements[item.component]
    const node: any = {
      label: item.label || element?.title || item.component,
      designKey: item.designKey || item.name,
      icon: element?.icon || 'component',
      component: item.component
    }

    // 如果有子节点,递归处理
    if (item.children && item.children.length > 0) {
      node.children = buildTreeData(item.children)
    }

    return node
  })
}

const treeData = computed(() => {
  if (!designInstance) return []

  const schema = designInstance.getSchema()

  // 根节点
  const rootNode = {
    label: '表单',
    designKey: 'root',
    icon: h(Icon, { name: 'form' }),
    children: buildTreeData(schema.items)
  }

  return [rootNode]
})

const currentNodeKey = computed(() => {
  return designInstance?.currentKey || 'root'
})

const handleNodeClick = (data: any) => {
  if (designInstance) {
    designInstance.setCurrentKey(data.designKey)
  }
}
</script>

<style scoped lang="scss">
@import '@/style';

@include ns('outline') {
  height: 100%;
  overflow-y: auto;

  .tree-node {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    padding: 0 8px;

    .node-icon {
      font-size: 16px;
      color: $themeColor;
      flex-shrink: 0;
    }

    .node-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
