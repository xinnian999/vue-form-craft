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
      <el-button size="small" type="danger" @click="handleClear">清空</el-button>
      <el-button size="small" @click="handleSave" type="primary">保存</el-button>
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
      <el-tabs
        v-if="dialogState.type === 'exec'"
        model-value="json"
        class="demo-tabs"
        @tab-click="handleClick"
      >
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

      <highlightjs
        v-if="dialogState.type === 'vue'"
        class="vueCode"
        language="js"
        :code="vueEditStr(schema)"
      />

      <FormRender
        v-if="dialogState.type === 'form'"
        v-model="formValues"
        :schema="schema"
        ref="formRef"
        :schemaContext="previewSchemaContext"
        :style="{ minHeight: '200px' }"
      />

      <template #footer v-if="dialogState.type === 'form'">
        <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
        <el-button @click="formRef.resetFields()" type="primary">重置</el-button>
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

<script setup>
import { ref, computed, inject, defineProps, reactive } from 'vue'
import { ElButton, ElDialog, ElTabs, ElTabPane, ElMessageBox } from 'element-plus'
import JsonEditorVue from 'json-editor-vue3'
import { FormRender } from '@/components'
import { $schema, $methods, $global } from '@/config/symbol'
import { changeItems } from '../utils'
import vueEditStr from './vueEditStr'
import helpStr from './helpStr'

const previewActions = [
  {
    label: '预览JSON脚本',
    btnType: 'primary',
    type: 'exec'
  },
  {
    label: '生成VUE代码',
    btnType: 'default',
    type: 'vue'
  },
  {
    label: '预览表单',
    btnType: 'default',
    type: 'form'
  }
]

defineProps({
  previewSchemaContext: {
    type: Object,
    default: () => ({})
  }
})

const { schema, updateSchema } = inject($schema)

const { handleSave } = inject($methods)

const { elements } = inject($global)

const JsonEdit = elements.JsonEdit?.component

const json = computed({
  get() {
    return schema.value
  },
  set(value) {
    updateSchema(value)
  }
})

const formRef = ref(null)

const formValues = ref({})

const formContext = computed(() => formRef.value?.context)

const dialogState = reactive({
  visible: false,
  type: '',
  title: ''
})

const handlePreview = (type, label) => {
  dialogState.visible = true
  dialogState.type = type
  dialogState.title = label
}

const onBlur = (editor) => {
  schema.value = { ...schema.value, items: changeItems(schema.value.items) }
  editor.repair()
}

const handleSubmit = async () => {
  await formRef.value.validate()

  alert(JSON.stringify(formValues.value, null, 2), '模拟提交')
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
