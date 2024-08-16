<template>
  <div class="attrForm">
    <h4 v-if="!Object.keys(current).length">未选中字段</h4>

    <template v-else>
      <FormRender :key="current.designKey" v-model="current" :schema="attrSchema" />

      <el-divider>高级配置</el-divider>

      <div class="current-footer">
        <el-button @click="handleEditLinkage">联动配置</el-button>
        <el-button @click="handleEditJSON">编辑JSON</el-button>
      </div>

      <el-dialog
        destroy-on-close
        v-model="dialogState.visible"
        top="3vh"
        :title="dialogState.title"
      >
        <json-editor-vue
          v-if="dialogState.type === 'json'"
          class="editor"
          v-model="current"
          currentMode="code"
          :modeList="['text', 'view', 'tree', 'code', 'form']"
          :options="{ search: true, history: true }"
          language="zh"
        />

        <FormRender
          v-if="dialogState.type === 'linkage'"
          v-model="current"
          :schema="linkageSchema(schema, current)"
        />
      </el-dialog>
    </template>
  </div>
</template>

<script setup>
import { computed, inject, reactive } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDialog, ElDivider } from 'element-plus'
import { $current, $global } from '@/config/symbol'
import { FormRender } from '@/components'
import linkageSchema from './linkageSchema'
import { $schema } from '@/config/symbol'

const { elements } = inject($global)

const { current } = inject($current)

const { schema } = inject($schema)

const dialogState = reactive({
  visible: false,
  type: '',
  title: ''
})

const attrSchema = computed(() => {
  const config = elements[current.value.component]

  if (config.attrSchema) {
    return config.attrSchema
  }

  if (config) {
    return { size: 'small', labelAlign: 'top', items: config.attr }
  }

  return { size: 'small', labelAlign: 'top', items: [] }
})

const handleEditLinkage = () => {
  dialogState.visible = true
  dialogState.type = 'linkage'
  dialogState.title = `字段联动配置`
}

const handleEditJSON = () => {
  dialogState.visible = true
  dialogState.type = 'json'
  dialogState.title = `编辑字段JSON`
}
</script>

<style scoped lang="less">
.attrForm {
  h3 {
    margin-bottom: 10px;
  }
  .current-footer {
    text-align: center;
  }
}
</style>
