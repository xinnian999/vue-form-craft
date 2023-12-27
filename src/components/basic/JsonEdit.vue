<template>
  <el-button @click="handlePreviewExec">{{ title }}</el-button>

  <el-dialog
    v-model="execVisible"
    :title="title"
    width="70%"
    class="dialog"
    center
    destroy-on-close
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
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElMessageBox } from 'element-plus'
import { changeItems } from '@/utils'

const props = defineProps({
  modelValue: {},
  name: String,
  title: {
    type: String,
    default: '编辑'
  }
})

const emits = defineEmits(['update:modelValue'])

const json = computed({
  get() {
    const { name, modelValue } = props
    if (name) {
      return modelValue ? { [name]: modelValue } : { [name]: [] }
    }
    return props.modelValue
  },
  set(val) {
    const { name } = props
    if (name) {
      emits('update:modelValue', val[props.name])
    } else {
      emits('update:modelValue', val)
    }
  }
})

const execVisible = ref(false)

const handlePreviewExec = () => {
  execVisible.value = true
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
</script>

<style>
.formDesign-actions {
  padding: 10px;
  text-align: right;
}
</style>
