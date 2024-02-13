<template>
  <div class="attrForm">
    <h4 v-if="!Object.keys(current).length">未选中字段</h4>

    <template v-else>
      <schema-form :key="current.onlyId" v-model="current" :schema="attrSchema"></schema-form>

      <div>
        <el-button @click="handleEdit">编辑配置文本</el-button>
      </div>

      <el-drawer destroy-on-close v-model="editVisible">
        <json-editor-vue
          class="editor"
          v-model="current"
          currentMode="code"
          :modeList="['text', 'view', 'tree', 'code', 'form']"
          :options="{ search: true, history: true }"
          language="zh"
        />
      </el-drawer>
    </template>
  </div>
</template>

<script setup lang="jsx">
import { computed, inject, ref } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDrawer } from 'element-plus'

import { SchemaForm } from '@/components'

const { elements } = inject('$options')

const current = inject('$current')

const editVisible = ref(false)

const attrSchema = computed(() => {
  const config = elements[current.value.component]

  if (config) {
    return { size: 'small', labelAlign: 'top', items: config.attr }
  }

  return { size: 'small', labelAlign: 'top', items: [] }
})

const handleEdit = () => {
  editVisible.value = true
}
</script>

<style scoped lang="less">
.attrForm {
  h3 {
    margin-bottom: 10px;
  }
}
</style>
