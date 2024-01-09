<template>
  <div class="formDesign-menus">
    <el-button class="template-btn" size="small" @click="drawerVisible = true">使用模板</el-button>
    <el-drawer
      v-model="drawerVisible"
      title="模板列表"
      size="60%"
      class="template-drawer"
      :append-to-body="false"
    >
      <el-space wrap>
        <el-button :key="name" v-for="{ name, schema } in template" @click="useTemplate(schema)">
          {{ name }}
        </el-button>
      </el-space>
    </el-drawer>

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
  </div>
</template>

<script setup lang="jsx">
import draggable from 'vuedraggable-es'
import { inject } from 'vue'
import { ElButton, ElDrawer, ElSpace } from 'element-plus'
import IconRender from '@/components/IconRender.vue'
import { ref } from 'vue'
import menus from './menus'
import template from './template'

const drawerVisible = ref(false)

const schema = inject('$schema')

const useTemplate = (templateSchema) => {
  schema.value = templateSchema
}
</script>

<style lang="less">
.formDesign-menus {
  .template-btn {
    position: absolute;
    right: 10px;
    top: 20px;
  }

  .template-drawer {
    position: absolute;
    text-align: center;
  }
  .el-overlay {
    position: absolute;
  }

  .ghost,
  .fallback,
  .drag {
    list-style: none;
  }

  .type-title {
    margin-bottom: 10px;
    margin-top: 10px;
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
}
</style>
