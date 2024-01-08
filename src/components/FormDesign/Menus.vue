<template>
  <div v-for="{ title, children } in menus" :key="title">
    <h4 class="type-title">{{ title }}</h4>
    <draggable
      class="list"
      :list="children"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      ghost-class="ghost"
      drag-class="drag"
      fallback-class="fallback"
      item-key="onlyId"
    >
      <template #item="{ element }">
        <li class="form-item-btn">
          <div class="ico"><IconRender :name="element.initialValues.component" /></div>
          <div class="name">{{ element.name }}</div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="jsx">
import draggable from 'vuedraggable-es'
import IconRender from '@/components/IconRender.vue'
import {
  input,
  textarea,
  select,
  radio,
  checkbox,
  cascader,
  inputNumber,
  switch as switchConfig,
  jsonEdit,
  colorPicker,
  formList,
  itemGroup,
  button,
  card,
  password,
  inline
} from './elements'

const menus = [
  {
    title: '基础字段',
    children: [
      input,
      textarea,
      password,
      select,
      radio,
      checkbox,
      cascader,
      inputNumber,
      switchConfig,
      jsonEdit,
      colorPicker
    ]
  },
  {
    title: '高级字段',
    children: [formList, itemGroup]
  },
  {
    title: '布局字段',
    children: [card, inline]
  },
  {
    title: '功能字段',
    children: [button]
  }
]
</script>

<style scoped lang="less">
.ghost,
.fallback,
.drag {
  list-style: none;
}

.type-title {
  margin-bottom: 10px;
  margin-top: 20px;
}
.list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 0;
  flex-wrap: wrap;
  .form-item-btn {
    list-style: none;
    padding: 5px 0px;
    margin-bottom: 10px;
    cursor: move;
    border: 1px dashed transparent;
    &:hover {
      border: 1px dashed var(--el-color-primary);
      color: var(--el-color-primary);
    }
    background-color: aliceblue;
    width: 45%;
    display: flex;
    .ico {
      width: 40px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .name {
      flex: 1;
      font-size: 14px;
    }
  }
}
</style>
