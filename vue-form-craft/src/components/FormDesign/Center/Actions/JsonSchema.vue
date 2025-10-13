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
        <JsonEdit
          v-model="json"
          style="height: 70vh"
          @init="setupAutoComplete"
          @modeChange="onModeChange"
        />
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
        <Markdown
          v-model="help"
          read
          :code-foldable="false"
          previewStyle="height: 70vh; overflow-y: auto"
        />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CodeHighLight, JsonEdit, Markdown } from '@/components'
import { useDesignInstance, useLocale } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { jsJsonSchema, jsVue, tsJsonSchema, tsVue } from './config'
import help from './help.md?raw'
import 'md-editor-v3/lib/style.css'
import JsonEditor from 'jsoneditor'
import { setupAutoComplete } from './autoComplete'

const designInstance = useDesignInstance()

const locale = useLocale()

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

const onModeChange = (newMode: string, editor: JsonEditor) => {
  if (newMode === 'code') {
    setupAutoComplete(editor)
  }
}
</script>
