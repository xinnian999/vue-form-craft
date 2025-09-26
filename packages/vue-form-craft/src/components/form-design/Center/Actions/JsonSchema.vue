<template>
  <el-dialog
    v-model="visible"
    :title="locale.actions.previewJson"
    width="75%"
    center
    destroy-on-close
    top="10vh"
    @close="formValues = {}"
  >
    <el-tabs model-value="edit" class="demo-tabs">
      <el-tab-pane name="edit" lazy>
        <template #label>
          <Icon name="script" style="margin-right: 5px" />
          <span>在线编辑</span>
        </template>
        <JsonEditor v-model="json" style="height: 70vh" @blur="onBlur" />
      </el-tab-pane>
      <el-tab-pane name="ts" lazy>
        <template #label>
          <Icon name="ts" style="margin-right: 5px" />
          <span>生成TS文件</span>
        </template>
        <CodeHighLight style="height: 70vh" language="ts" :code="tsJsonSchema(json)" />
      </el-tab-pane>
      <el-tab-pane name="js" lazy>
        <template #label>
          <Icon name="js" style="margin-right: 5px" />
          <span>生成JS文件</span>
        </template>
        <CodeHighLight style="height: 70vh" language="js" :code="jsJsonSchema(json)" />
      </el-tab-pane>
      <el-tab-pane name="tsVue" lazy>
        <template #label>
          <Icon name="vue" style="margin-right: 5px" />
          <span>生成TS组件</span>
        </template>
        <CodeHighLight style="height: 70vh" :code="tsVue(designInstance.schema)" language="vue" />
      </el-tab-pane>
      <el-tab-pane name="jsVue" lazy>
        <template #label>
          <Icon name="vue" style="margin-right: 5px" />
          <span>生成JS组件</span>
        </template>
        <CodeHighLight style="height: 70vh" :code="jsVue(designInstance.schema)" language="vue" />
      </el-tab-pane>
      <el-tab-pane name="help" lazy>
        <template #label>
          <Icon name="help" style="margin-right: 5px" />
          <span>帮助</span>
        </template>
        <CodeHighLight style="height: 70vh" language="json" :code="schemaHelp" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  changeItems,
  CodeHighLight,
  Icon,
  useDesignInstance,
  useElements,
  useLocale
} from '@vue-form-craft/core'
import { jsJsonSchema, jsVue, schemaHelp, tsJsonSchema, tsVue } from './config'

const designInstance = useDesignInstance()

const locale = useLocale()

const elements = useElements()

const JsonEditor = elements.JsonEdit?.render

const json = computed({
  get() {
    return designInstance.schema
  },
  set(value) {
    if (value.items) {
      designInstance.updateSchema(value)
    }
  }
})

const formValues = ref({})

const visible = defineModel<boolean>()

const onBlur = (editor: any) => {
  // designInstance.updateSchema({
  //   ...designInstance.schema,
  //   items: changeItems(designInstance.schema.items)
  // })
  editor.repair()
}
</script>
