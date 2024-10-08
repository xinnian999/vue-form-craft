<template>
  <div class="vfc-linkageConfig">
    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

    <div class="vfc-linkageConfig-btns">
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

    <el-dialog destroy-on-close v-model="visible" top="3vh" :title="title">
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
import { $locale, $schema } from '@vue-form-craft/config/symbol'
import { FormRender } from '@vue-form-craft/components'
import JsonEditorVue from 'json-editor-vue3'
import linkageSchema from '../linkageSchema'
import type { FormItemType } from '@vue-form-craft/release'

const model = defineModel<FormItemType>()

const locale = inject($locale)!

const { schema } = inject($schema)!

const visible = ref(false)

const type = ref('config')

const title = ref('')

const linkageBtns = [
  {
    title: locale.value.attr.tab1.linkage.action1,
    onClick: () => {
      visible.value = true
      type.value = 'config'
      title.value = '配置项联动'
    }
  },
  {
    title: locale.value.attr.tab1.linkage.action2,
    onClick: () => {
      visible.value = true
      type.value = 'value'
      title.value = '值联动'
    }
  }
]
</script>

<style scoped lang="less">
.vfc-linkageConfig{
  padding-top: 30px;
  &-btns{
    text-align: center;
  }
}
</style>
