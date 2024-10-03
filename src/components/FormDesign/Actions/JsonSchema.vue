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
    <el-tabs model-value="json" class="demo-tabs">
      <el-tab-pane label="JsonSchema" name="json">
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
      <el-tab-pane label="帮助" name="help">
        <CodeHighLight style="height: 70vh;" language="json" :code="schemaHelp" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { $locale, $schema } from '@vue-form-craft/config/symbol'
import { CodeHighLight } from '@vue-form-craft/components'
import { changeItems } from '../utils'
import { schemaHelp } from './config'

const { schema, updateSchema } = inject($schema)!

const locale = inject($locale)!

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
