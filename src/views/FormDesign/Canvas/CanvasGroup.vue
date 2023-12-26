<template>
  <div class="CanvasGroup">
    <el-card v-if="component === 'card'" :header="label">
      <draggable
        :list="children"
        group="form"
        itemKey="name"
        chosenClass="active"
        ghost-class="ghost"
        class="childContainer"
        @add="handleAdd"
      >
        <template #item="{ element: child, index }">
          <CanvasRender :element="child" :index="index" />
        </template>
      </draggable>
    </el-card>

    <div v-if="['formList', 'itemGroup'].includes(component)" class="default">
      <div class="title">【{{ componentNames[component] }}】 {{ label }} {{ name }}</div>
      <draggable
        :list="children"
        group="form"
        itemKey="name"
        chosenClass="active"
        ghost-class="ghost"
        class="childContainer"
        @add="handleAdd"
      >
        <template #item="{ element: child, index }">
          <CanvasRender :element="child" :index="index" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject } from 'vue'
import draggable from 'vuedraggable-es'
import CanvasRender from './CanvasRender.vue'

defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  modelValue: null,
  initialValue: null,
  children: Array,
  componentName: String
})

const componentNames = {
  formList: '自增容器',
  itemGroup: '字段组'
}

const handleAdd = inject('handleAdd')
</script>

<style lang="less">
.childContainer {
  min-height: 150px;
}
.CanvasGroup {
  margin-bottom: 10px;
  .default {
    border: 2px dashed var(--el-color-primary);
    margin: 10px;
    position: relative;
    .title {
      position: absolute;
      left: 0;
      top: -20px;
      padding: 1px 5px;
      background-color: var(--el-color-primary);
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
