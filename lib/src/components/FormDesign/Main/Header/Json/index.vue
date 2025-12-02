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
        <JsonSchemaEdit :json="json" @save="onSave" />
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
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CodeHighLight, Icon } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import { repirJsonSchema } from '@/utils'
import { jsJsonSchema, jsVue, tsJsonSchema, tsVue } from './config'
import JsonSchemaEdit from './Edit.vue'
import ImportJsonSchema from './Import.vue'

const visible = defineModel<boolean>()

const designInstance = useDesignInstance()!

const json = computed(() => designInstance.getSchema())

const formValues = ref({})

const onSave = (json: FormSchema) => {
  const repirJson = repirJsonSchema(json)
  designInstance.setSchema(repirJson)
  designInstance.recordHistory('编辑JSON')
  visible.value = false
}
</script>
