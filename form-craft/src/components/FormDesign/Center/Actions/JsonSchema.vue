<template>
  <el-dialog
    v-model="visible"
    :title="locale.actions.previewJson"
    width="75%"
    center
    destroy-on-close
    top="5vh"
    @close="formValues = {}"
  >
    <el-tabs model-value="edit" class="demo-tabs">
      <el-tab-pane name="edit" lazy>
        <template #label>
          <Icon name="script" style="margin-right: 5px" />
          <span>在线编辑</span>
        </template>
        <JsonSchemaEdit :json="json" @save="onSave" />
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
import { CodeHighLight, JsonSchemaEdit, Markdown } from '@/components'
import { useDesignInstance, useLocale } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { jsJsonSchema, jsVue, tsJsonSchema, tsVue } from './config'
import help from './help.md?raw'
import 'md-editor-v3/lib/style.css'
import type { FormSchema } from '@/types'
import { repirJsonSchema } from '@/utils'

const designInstance = useDesignInstance()

const locale = useLocale()

const json = computed(() => designInstance.getSchema())

const formValues = ref({})

const visible = defineModel<boolean>()

const onSave = (json: FormSchema) => {
  const repirJson = repirJsonSchema(json)
  designInstance.applySchema(repirJson)
}
</script>
