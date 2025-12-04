<template>
  <div>
    <Button type="primary" plain size="small" @click="handleEdit">编辑</Button>
    <el-dialog v-model="visible" title="全局样式配置" append-to-body destroy-on-close width="800px">
      <div
        class="monaco-editor-wrapper"
        style="height: 500px; border: 1px solid #dcdfe6; border-radius: 4px"
      >
        <vue-monaco-editor
          v-model:value="cssText"
          language="css"
          :theme="'vs-dark'"
          :options="editorOptions"
        />
      </div>

      <template #footer>
        <Button @click="visible = false">取消</Button>
        <Button type="primary" @click="handleSave">保存</Button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ref } from 'vue'
import { useUI } from '@/hooks'

const { Button } = useUI()

const modelValue = defineModel<string>()

const visible = ref<boolean>(false)

const cssText = ref<string>('')

const handleEdit = () => {
  visible.value = true
  cssText.value = modelValue.value || ''
}

// Monaco Editor 配置
const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on' as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  tabSize: 2,
  wordWrap: 'on' as const,
  suggest: {
    snippetsPreventQuickSuggestions: false
  },
  quickSuggestions: true,
  acceptSuggestionOnEnter: 'on' as const
}

const handleSave = () => {
  modelValue.value = cssText.value
  visible.value = false
}
</script>
