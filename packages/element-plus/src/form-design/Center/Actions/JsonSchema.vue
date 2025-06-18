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
        <JsonEditor
          v-model="json"
          style="height:70vh"
          @blur="onBlur"
        />
      </el-tab-pane>
      <el-tab-pane label="生成ts文件" name="ts">
        <CodeHighLight style="height: 70vh" language="ts" :code="tsJsonSchema(json)" />
      </el-tab-pane>
      <el-tab-pane label="生成js文件" name="js">
        <CodeHighLight style="height: 70vh" language="js" :code="jsJsonSchema(json)" />
      </el-tab-pane>
      <el-tab-pane label="帮助" name="help">
        <CodeHighLight style="height: 70vh" language="json" :code="schemaHelp" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeHighLight } from '@/components'
import { changeItems } from '@form-magic/core'
import { schemaHelp, tsJsonSchema, jsJsonSchema } from './config'
import { useDesignInstance, useElements, useLocale } from '@/hooks'

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
  designInstance.updateSchema({
    ...designInstance.schema,
    items: changeItems(designInstance.schema.items)
  })
  editor.repair()
}
</script>
