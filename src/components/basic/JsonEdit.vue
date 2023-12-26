<template>
  <el-button @click="handlePreviewExec">预览脚本</el-button>

  <el-dialog
    v-model="execVisible"
    title="预览脚本"
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
  modelValue: {}
})

const emits = defineEmits(['update:modelValue'])

const json = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
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
