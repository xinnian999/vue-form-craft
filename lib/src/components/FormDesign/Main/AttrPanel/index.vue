<template>
  <div :class="ns('form-design-right')">
    <div class="breadcrumb">
      <span
        class="breadcrumb-item"
        @click="designInstance.setCurrentKey('root')"
        @mousemove="designInstance.setHoverKey('root')"
      >
        表单
      </span>
      <template v-for="node in breadcrumbPath" :key="node.designKey">
        <span class="breadcrumb-separator">></span>
        <span
          class="breadcrumb-item"
          @click="designInstance.setCurrentKey(node.designKey!)"
          @mousemove="designInstance.setHoverKey(node.designKey!)"
        >
          {{ node.label || node.name }}
        </span>
      </template>
    </div>
    <AttrEdit />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'
import { ns } from '@/utils'
import AttrEdit from './Attr.vue'

const designInstance = useDesignInstance()!

// 获取从根节点到当前节点的路径
const breadcrumbPath = computed(() => {
  if (designInstance.currentKey === 'root') {
    return []
  }

  const path: FormItemType[] = []
  const schema = designInstance.getSchema()

  // 递归查找节点路径
  const findPath = (
    items: FormItemType[],
    targetKey: string,
    currentPath: FormItemType[]
  ): boolean => {
    for (const item of items) {
      const newPath = [...currentPath, item]

      if (item.designKey === targetKey) {
        path.push(...newPath)
        return true
      }

      if (item.children && item.children.length > 0) {
        if (findPath(item.children, targetKey, newPath)) {
          return true
        }
      }
    }
    return false
  }

  if (schema.items) {
    findPath(schema.items, designInstance.currentKey, [])
  }

  return path
})
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-right') {
  width: 350px;
  overflow: auto;

  .breadcrumb {
    padding: 5px 10px;
    font-size: 12px;
    border-bottom: 1px solid #e5e2e2;
    line-height: 25px;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;

    .breadcrumb-item {
      cursor: pointer;
      font-size: 12px;
      color: #606266;
      transition: color 0.2s;

      &:hover {
        color: $themeColor;
      }
    }

    .breadcrumb-separator {
      color: #c0c4cc;
      font-size: 12px;
    }
  }

  @include ns('attr') {
    padding: 10px;
  }
}
</style>
