<template>
  <div class="vfc-linkageConfig">
    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

    <div class="current-footer">
      <el-button
        v-for="{ title, onClick } in linkageBtns"
        :key="title"
        type="primary"
        plain
        size="small"
        @click="onClick"
        >{{ title }}</el-button
      >
    </div>

    <el-dialog destroy-on-close v-model="visible" top="3vh" title="值联动">
      <json-editor-vue
        v-if="type === 'config'"
        class="editor"
        v-model="model"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
      />
      <FormRender v-if="type === 'value'" v-model="model" :schema="linkageSchema(schema, model!)" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { $locale, $schema } from '@/config/symbol'
import { FormRender } from '@/components'
import JsonEditorVue from 'json-editor-vue3'
import linkageSchema from '../linkageSchema'
import type { FormItemType } from '@/release'

const model = defineModel<FormItemType>()

const locale = inject($locale)!

const { schema } = inject($schema)!

const visible = ref(false)

const type = ref('config')

const linkageBtns = [
  {
    title: locale.value.attr.tab1.linkage.action1,
    onClick: () => {
      visible.value = true
      type.value = 'config'
    }
  },
  {
    title: locale.value.attr.tab1.linkage.action2,
    onClick: () => {
      visible.value = true
      type.value = 'value'
    }
  }
]
</script>

<style scoped lang="less">
.vfc-linkageConfig{
  padding-top: 30px;
  text-align: center;
}
</style>
