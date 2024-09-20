<template>
  <div class="formDesign-actions">
    <div class="formDesign-actions-left">
      <el-button
        v-for="{ label, type, btnType } in previewActions"
        :key="type"
        :type="btnType"
        size="small"
        @click="handlePreview(type, label)"
        >{{ label }}</el-button
      >
    </div>

    <div class="formDesign-actions-right">
      <el-button size="small" type="danger" @click="handleClear">{{
        locale.actions.clear
      }}</el-button>
      <el-button size="small" @click="handleSave" type="primary">{{
        locale.actions.save
      }}</el-button>
    </div>

    <el-dialog
      v-model="dialogState.visible"
      :title="dialogState.title"
      width="70%"
      center
      destroy-on-close
      top="10vh"
      @close="formValues = {}"
    >
      <el-tabs v-if="dialogState.type === 'exec'" model-value="json" class="demo-tabs">
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
          <highlightjs class="vueCode" language="json" :code="helpStr" />
        </el-tab-pane>
      </el-tabs>

      <el-tabs v-if="dialogState.type === 'vue'" model-value="ts" class="demo-tabs">
        <el-tab-pane label="Typescript" name="ts">
          <highlightjs
            class="vueCode"
            language="js"
            :code="tsVue(schema)"
          />
        </el-tab-pane>
        <el-tab-pane label="Javascript" name="js">
          <highlightjs
            class="vueCode"
            language="js"
            :code="jsVue(schema)"
          />
        </el-tab-pane>
      </el-tabs>

      <FormRender
        v-if="dialogState.type === 'form'"
        v-model="formValues"
        :schema="schema"
        ref="formRef"
        :schemaContext="schemaContext"
        :style="{ minHeight: '200px' }"
      />

      <template #footer v-if="dialogState.type === 'form'">
        <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
        <el-button @click="formRef?.resetFields([])" type="primary">重置</el-button>
        <!-- <JsonEdit
          v-model="formContext"
          height="400px"
          title="联动变量"
          description="实时预览表单的联动变量，调试联动"
          mode="dialog"
        /> -->
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, defineProps, reactive } from 'vue'
import { ElButton, ElDialog, ElTabs, ElTabPane, ElMessageBox } from 'element-plus'
import JsonEditorVue from 'json-editor-vue3'
import { FormRender } from '@/components'
import { $schema, $methods, $locale } from '@/config/symbol'
import { changeItems } from '../utils'
import {tsVue,jsVue} from './vueEditStr'
import helpStr from './helpStr'
import type { FormRenderInstance } from '@/release'

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  type: string
}

defineProps({
  schemaContext: {
    type: Object,
    default: () => ({})
  }
})

const { schema, updateSchema } = inject($schema)!

const { handleSave } = inject($methods)!

const locale = inject($locale)!

const previewActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    type: 'exec'
  },
  {
    label: locale.value.actions.previewVueCode,
    btnType: 'default',
    type: 'vue'
  },
  {
    label: locale.value.actions.previewForm,
    btnType: 'default',
    type: 'form'
  }
]

const json = computed({
  get() {
    return schema.value
  },
  set(value) {
    updateSchema(value)
  }
})

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const dialogState = reactive({
  visible: false,
  type: '',
  title: ''
})

const handlePreview = (type: string, label: string) => {
  dialogState.visible = true
  dialogState.type = type
  dialogState.title = label
}

const onBlur = (editor: any) => {
  schema.value = { ...schema.value, items: changeItems(schema.value.items) }
  editor.repair()
}

const handleSubmit = async () => {
  await formRef.value?.validate()

  alert(JSON.stringify(formValues.value, null, 2))
}

const handleClear = async () => {
  await ElMessageBox.confirm('确认清空当前设计吗？')
  schema.value = { ...schema.value, items: [] }
}
</script>

<style scoped lang="less">
.formDesign-actions {
  /* padding: 10px; */
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .formDesign-actions-left,
  .formDesign-actions-right {
    button {
      margin-bottom: 10px;
    }
  }

  .vueCode {
    max-height: 60vh;
    overflow: auto;
  }
}
</style>
