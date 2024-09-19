<template>
  <div class="attrForm">
    <h4 v-if="!current">{{ locale.attr.tab1.emptyTip }}</h4>

    <template v-else>
      <FormRender :key="current.designKey" v-model="current" :schema="attrSchema" />

      <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

      <div class="current-footer">
        <el-button @click="handleEditJSON">{{ locale.attr.tab1.linkage.action1 }}</el-button>
        <el-button @click="handleEditLinkage">{{ locale.attr.tab1.linkage.action2 }}</el-button>
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
import { $current, $global, $locale } from '@/config/symbol'
import { FormRender } from '@/components'
import linkageSchema from './linkageSchema'
import { $schema } from '@/config/symbol'
import { getDataByPath } from '@/utils'
import { isString } from 'lodash'
import type { FormItemType, FormSchema } from '@/release'

const { elements } = inject($global)!

const { current } = inject($current)!

const { schema } = inject($schema)!

const locale = inject($locale)!

const dialogState = reactive({
  visible: false,
  type: '',
  title: ''
})

const attrSchema = computed(() => {
  if (current.value) {
    const config = elements[current.value.component]

    if (config.attrSchema) {
      const parseItems = (nodes:FormItemType[]) => {
        return nodes.map((item) => {
          const value = getDataByPath(current.value!, item.name)
          if (isString(value) && /^{{\s*(.*?)\s*}}$/.test(value)) {
            return { ...item, component: 'Input', dialog: true }
          }
          if (item.children) {
            item.children = parseItems(item.children)
          }
          return item
        })
      }

      const items = parseItems(config.attrSchema.items)

      return {
        ...config.attrSchema,
        // 将联动组件改用弹窗展示
        items: [
          {
            label: '组件类型',
            component: 'Tag',
            name:'componentType',
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
