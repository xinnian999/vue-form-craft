<template>
  <div class="attrForm">
    <h4 v-if="!current">未选中字段</h4>

    <template v-else>
      <FormRender :key="current.designKey" v-model="current" :schema="attrSchema" />

      <el-divider>联动</el-divider>

      <div class="current-footer">
        <el-button @click="handleEditJSON">配置项联动</el-button>
        <el-button @click="handleEditLinkage">值联动</el-button>
      </div>

      <el-dialog
        destroy-on-close
        v-model="dialogState.visible"
        top="3vh"
        :title="dialogState.title"
      >
        <div style="font-weight: bold; margin-bottom: 10px">
          {{
            dialogState.type === 'json'
              ? '直接将需要动态设置的配置项，改为模版表达式即可'
              : '本字段的值改变时，联动其他字段的值'
          }}
        </div>

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

<script setup lang="ts">
import { computed, inject, reactive } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDialog, ElDivider } from 'element-plus'
import { $current, $global } from '@/config/symbol'
import { FormRender } from '@/components'
import linkageSchema from './linkageSchema'
import { $schema } from '@/config/symbol'
import { getDataByPath } from '@/utils'
import { isString } from 'lodash'
import type { FormSchema } from '@/release'

const { elements } = inject($global)!

const { current } = inject($current)!

const { schema } = inject($schema)!

const dialogState = reactive({
  visible: false,
  type: '',
  title: ''
})

const attrSchema = computed(() => {
  if (current.value) {
    const config = elements[current.value.component]

    if (config.attrSchema) {
      const buildItems = (nodes) => {
        return nodes.map((item) => {
          const value = getDataByPath(current.value, item.name)
          if (isString(value) && /^{{\s*(.*?)\s*}}$/.test(value)) {
            return { ...item, component: 'Input', dialog: true }
          }
          if (item.children) {
            item.children = buildItems(item.children)
          }
          return item
        })
      }

      const items = buildItems(config.attrSchema.items)

      return {
        ...config.attrSchema,
        // 将联动组件改用弹窗展示
        items: [
          {
            label: '组件类型',
            component: 'Tag',
            props: {
              text: config.name
            }
          },
          ...items
        ]
      }
    }
  }

  return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
})

const handleEditLinkage = () => {
  dialogState.visible = true
  dialogState.type = 'linkage'
  dialogState.title = `值联动`
}

const handleEditJSON = () => {
  dialogState.visible = true
  dialogState.type = 'json'
  dialogState.title = `配置联动`
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
