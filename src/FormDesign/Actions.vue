<template>
  <div class="formDesign-actions">
    <div>
      <el-button size="small" @click="handlePreviewExec">预览JSON脚本</el-button>
      <el-button size="small" @click="handlePreviewVue">生成VUE代码</el-button>
      <el-button size="small" @click="handlePreviewForm">预览表单</el-button>
    </div>
    <div>
      <el-button size="small" type="danger" @click="handleClear">清空</el-button>
      <el-button size="small" @click="handleSave" type="primary">保存</el-button>
    </div>

    <el-dialog
      v-model="execVisible"
      title="预览脚本"
      width="70%"
      center
      destroy-on-close
      top="10vh"
    >
      <json-editor-vue
        class="editor"
        v-model="json"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
        @blur="onBlur"
      />
    </el-dialog>

    <el-dialog
      v-model="vueVisible"
      title="VUE代码"
      width="70%"
      class="dialog"
      center
      destroy-on-close
      top="10vh"
    >
      <VueEdit />
    </el-dialog>

    <el-dialog
      v-model="formVisible"
      title="预览表单"
      width="70%"
      class="dialog"
      destroy-on-close
      center
      top="10vh"
    >
      <schema-form
        v-model="form"
        :schema="schema"
        ref="formRef"
        :schemaContext="previewSchemaContext"
      />
      <template #footer>
        <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
        <el-button @click="formRef.reset()" type="primary">重置</el-button>
        <JsonEdit
          v-model="formContext"
          height="400px"
          title="联动变量"
          description="实时预览表单的联动变量，调试联动"
        />
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="jsx">
import { ref, computed, inject, defineProps } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDialog } from 'element-plus'
import { SchemaForm, JsonEdit } from '@/components'
import { changeItems } from '@/utils'
import VueEdit from './VueEdit.vue'

defineProps({
  previewSchemaContext: {
    type: Object,
    default: () => ({})
  }
})

const schema = inject('$schema')
const emit = inject('$emit')

const json = computed({
  get() {
    return schema.value
  },
  set(value) {
    schema.value = value
  }
})

const formRef = ref(null)

const form = ref({})

const formContext = computed(() => formRef.value?.context)

const execVisible = ref(false)

const formVisible = ref(false)

const vueVisible = ref(false)

const handlePreviewExec = () => {
  execVisible.value = true
}

const handlePreviewVue = () => {
  vueVisible.value = true
}

const handlePreviewForm = () => {
  form.value = {}
  formVisible.value = true
}

const onBlur = async (editor) => {
  const res = await editor.validate()
  if (res.length) {
    let parse = editor.getText()
    parse = new Function('return ' + parse)()
    parse.items = changeItems(parse.items)
    json.value = parse
  }
}

const handleSave = () => {
  emit('onSave', schema.value)
}

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values, null, 2), '模拟提交')
    })
    .catch((e) => console.log(e))
}

const handleClear = () => {
  schema.value = { ...schema.value, items: [] }
}
</script>

<style>
.formDesign-actions {
  padding: 10px;
  text-align: right;
  display: flex;
  justify-content: space-between;
}
</style>
