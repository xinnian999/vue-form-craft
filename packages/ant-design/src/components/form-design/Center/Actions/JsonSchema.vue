<template>
  <a-modal
    v-model:open="visible"
    :title="locale.actions.previewJson"
    width="70%"
    centered
    destroy-on-close
    top="10vh"
    @cancel="formValues = {}"
  >
    <a-tabs v-model:activeKey="tabKey">
      <a-tab-pane tab="在线编辑" key="edit">
        <JsonEditor
          v-model="json"
          style="height:70vh"
          @blur="onBlur"
        />
      </a-tab-pane>
      <a-tab-pane tab="生成ts文件" key="ts">
        <CodeHighLight style="height: 70vh" language="ts" :code="tsJsonSchema(json)" />
      </a-tab-pane>
      <a-tab-pane tab="生成js文件" key="js">
        <CodeHighLight style="height: 70vh" language="js" :code="jsJsonSchema(json)" />
      </a-tab-pane>
      <a-tab-pane tab="帮助" key="help">
        <CodeHighLight style="height: 70vh" language="json" :code="schemaHelp" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeHighLight } from '@form-magic/core'
import { tools } from '@form-magic/core'
import { schemaHelp, tsJsonSchema, jsJsonSchema } from './config'
import { useDesignInstance, useElements, useLocale } from '@form-magic/core'

const { changeItems } = tools

const tabKey = ref('edit')

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
