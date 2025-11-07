<template>
  <el-dialog
    v-model="visible"
    title="JsonSchema"
    width="75%"
    center
    destroy-on-close
    top="5vh"
    @close="formValues = {}"
  >
    <el-tabs model-value="edit" class="demo-tabs">
      <el-tab-pane name="edit">
        <template #label>
          <Icon name="script" style="margin-right: 5px" />
          <span>在线编辑</span>
        </template>
        <JsonSchemaEdit :json="json" @save="onSave" @init="onInit" />
      </el-tab-pane>
      <el-tab-pane name="import" lazy>
        <template #label>
          <Icon name="import" style="margin-right: 5px" />
          <span>导入</span>
        </template>
        <ImportJsonSchema />
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
        <CodeHighLight style="height: 70vh" :code="tsVue(json)" language="vue" />
      </el-tab-pane>
      <el-tab-pane name="jsVue" lazy>
        <template #label>
          <Icon name="vue" style="margin-right: 5px" />
          <span>生成JS组件</span>
        </template>
        <CodeHighLight style="height: 70vh" :code="jsVue(json)" language="vue" />
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
import { CodeHighLight, Markdown } from '@/components'
import { useDesignInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { jsJsonSchema, jsVue, tsJsonSchema, tsVue } from './config'
import help from './help.md?raw'
import 'md-editor-v3/lib/style.css'
import JsonEditorType from 'jsoneditor'
import type { FormSchema } from '@/types'
import { repirJsonSchema } from '@/utils'
import ImportJsonSchema from './Import.vue'
import JsonSchemaEdit from './JsonSchemaEdit/index.vue'

const props = defineProps<{ target: string }>()

const visible = defineModel<boolean>()

const designInstance = useDesignInstance()!

const json = computed(() => designInstance.getSchema())

const formValues = ref({})

const onSave = (json: FormSchema) => {
  const repirJson = repirJsonSchema(json)
  designInstance.applySchema(repirJson)
}

const onInit = (editor: JsonEditorType) => {
  if (!props.target) {
    return
  }

  const currentName = designInstance.current!.name

  setTimeout(() => {
    // 跳转到当前字段位置
    if (currentName) {
      const aceEditor = editor.aceEditor
      if (aceEditor) {
        // 先找到唯一的 currentName
        aceEditor.find(currentName, {
          backwards: false,
          wrap: true,
          caseSensitive: true,
          wholeWord: false,
          regExp: false
        })

        // 处理路径形式的 target（如 props.disabled）
        // 将路径拆分，逐级查找
        const targetParts = props.target.split('.')
        for (const part of targetParts) {
          aceEditor.find(part, {
            backwards: false,
            wrap: false,
            caseSensitive: true,
            wholeWord: false,
            regExp: false
          })
        }

        // 清除选中状态
        aceEditor.clearSelection()
      }
    }
  }, 100)
}
</script>
