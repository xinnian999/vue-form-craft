<template>
  <el-tabs v-bind="$attrs" v-model="activeKey" :key="tabsKey">
    <FormItemGroup :list="children" group="TabItem" />
  </el-tabs>

  <div class="action" v-if="formInstance.design">
    <Button type="primary" @click="handleAddTab">添加标签页</Button>

    <!-- 拖拽排序胶囊 -->
    <div class="drag-sort-capsule" v-if="children.length > 0">
      <div class="capsule-title">拖拽排序</div>
      <draggable
        :list="children"
        @end="handleDragEnd"
        item-key="designKey"
        class="drag-list"
        :animation="200"
      >
        <template #item="{ element }">
          <div class="drag-item">
            <span class="drag-handle">⋮⋮</span>
            <span class="tab-label">{{ element.label }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Draggable from 'vuedraggable-es-fix'
import { FormItemGroup } from '@/components'
import { useDesignInstance, useFormInstance, useUI } from '@/hooks'
import type { ComponentBaseProps, FormItemType } from '@/types'

const { Button } = useUI()

const props = defineProps<
  ComponentBaseProps & {
    defaultKey: string
  }
>()

const children = computed(() => props.formItemProps.children || [])

const activeKey = ref<string>(props.defaultKey)

const formInstance = useFormInstance()

const designInstance = useDesignInstance()

const tabsKey = ref(0)

const handleAddTab = () => {
  const newTab = {
    label: `选项卡${children.value.length + 1}`,
    name: `name${children.value.length + 1}`,
    component: 'TabPane',
    children: [],
    designKey: `tab-${children.value.length + 1}`
  }

  children.value.push(newTab)

  designInstance?.recordHistory('添加标签页')
}

const handleDragEnd = () => {
  // 拖拽结束后更新key，强制重新渲染tabs
  tabsKey.value++

  designInstance?.recordHistory('更新标签页排序')
}

// 仅在设计模式下监听children的变化，强制更新tabs
if (formInstance.design) {
  watch(
    () => children.value,
    () => {
      tabsKey.value++
    },
    { deep: true }
  )

  watch(
    () => designInstance?.currentKey,
    (currentKey) => {
      if (!currentKey) return

      // 递归查找节点属于哪个tab
      const findTabByDesignKey = (designKey: string): string | null => {
        // 遍历每个tab
        for (const tab of children.value) {
          // 如果当前key就是tab本身
          if (tab.designKey === designKey) {
            return tab.name
          }

          // 递归查找tab的children
          const findInChildren = (children: FormItemType[]): boolean => {
            for (const child of children) {
              if (child.designKey === designKey) {
                return true
              }
              if (child.children && child.children.length > 0) {
                if (findInChildren(child.children)) {
                  return true
                }
              }
            }
            return false
          }

          // 如果在当前tab的children中找到了
          if (tab.children && findInChildren(tab.children)) {
            return tab.name
          }
        }
        return null
      }

      const targetTabName = findTabByDesignKey(currentKey)

      if (targetTabName && targetTabName !== activeKey.value) {
        activeKey.value = targetTabName
      }
    }
  )
}
</script>

<style scoped>
.action {
  margin: 10px 0;
  text-align: center;
}

.drag-sort-capsule {
  margin-top: 15px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.capsule-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
  font-weight: 500;
}

.drag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.drag-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 16px;
  cursor: move;
  transition: all 0.2s;
  font-size: 13px;
}

.drag-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.drag-handle {
  margin-right: 6px;
  color: #c0c4cc;
  font-size: 14px;
  line-height: 1;
}

.tab-label {
  color: #606266;
  user-select: none;
}
</style>
