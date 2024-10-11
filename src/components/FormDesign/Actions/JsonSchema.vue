<template>
  <el-dialog
    v-model="visible"
    :title="locale.actions.previewJson"
    width="70%"
    center
    destroy-on-close
    top="10vh"
    @close="formValues = {}"
  >
    <el-tabs model-value="edit" class="demo-tabs">
      <el-tab-pane label="在线编辑" name="edit">
        <json-editor-vue
          class="editor"
          v-model="json"
          currentMode="code"
          :modeList="['text', 'view', 'tree', 'code', 'form']"
          :options="{ search: true, history: true }"
          language="zh"
          @blur="onBlur"
        />
      </el-tab-pane>
      <el-tab-pane label="生成ts文件" name="ts">
        <CodeHighLight style="height: 70vh;" language="ts" :code="tsJsonSchema(schema)" />
      </el-tab-pane>
      <el-tab-pane label="生成js文件" name="js">
        <CodeHighLight style="height: 70vh;" language="js" :code="jsJsonSchema(schema)" />
      </el-tab-pane>
      <el-tab-pane label="帮助" name="help">
        <CodeHighLight style="height: 70vh;" language="json" :code="schemaHelp" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { $schema } from '@vue-form-craft/config/symbol'
import { CodeHighLight } from '@vue-form-craft/components'
import { changeItems } from '../utils'
import { schemaHelp ,tsJsonSchema,jsJsonSchema} from './config'
import { useLocale } from '@vue-form-craft/hooks'

const { schema, updateSchema } = inject($schema)!

const locale = useLocale()

const json = computed({
  get() {
    return schema.value
  },
  set(value) {
    if (value.items) {
      updateSchema(value)
    }
  }
})

const formValues = ref({})

const visible = defineModel<boolean>()

const onBlur = (editor: any) => {
  schema.value = { ...schema.value, items: changeItems(schema.value.items) }
  editor.repair()
}
</script>
