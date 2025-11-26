<template>
  <el-tabs v-bind="$attrs" v-model="activeKey" :key="tabsKey">
    <FormItemGroup :children="children" :designKey="designKey" group="TabItem" />
  </el-tabs>

  <div class="action" v-if="formInstance.design">
    <el-button type="primary" @click="handleAddTab">添加标签页</el-button>
    
    <!-- 拖拽排序胶囊 -->
    <div class="drag-sort-capsule" v-if="childrenModel.length > 0">
      <div class="capsule-title">拖拽排序</div>
      <draggable
        v-model="childrenModel"
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
import { ref, watch } from 'vue'
import { FormItemGroup } from '@/components'
import { useChildrenModel, useFormInstance } from '@/hooks'
import Draggable from 'vuedraggable-es-fix'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
  designKey?: string
}>()

const activeKey = ref<string>(props.defaultKey)

const childrenModel = useChildrenModel(props)

const formInstance = useFormInstance()

const tabsKey = ref(0)

const handleAddTab = () => {
  childrenModel.value = childrenModel.value.concat({
    label: `选项卡${childrenModel.value.length + 1}`,
    name: `name${childrenModel.value.length + 1}`,
    component: 'TabPane',
    children: [],
    designKey: `tab-${childrenModel.value.length + 1}`
  })
}

const handleDragEnd = () => {
  // 拖拽结束后更新key，强制重新渲染tabs
  tabsKey.value++
}

// 仅在设计模式下监听childrenModel的变化，强制更新tabs
if (formInstance.design) {
  watch(
    () => childrenModel.value,
    () => {
      tabsKey.value++
    },
    { deep: true }
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
