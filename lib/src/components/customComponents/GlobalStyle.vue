<template>
  <div>
    <el-button type="primary" plain size="small" @click="handleEdit">编辑</el-button>
    <el-dialog v-model="visible" title="全局样式配置" append-to-body destroy-on-close width="800px">
      <el-alert type="info" :closable="false" style="margin-bottom: 16px">
        <template #default>
          <div style="font-size: 13px">
            <p style="margin: 0 0 8px 0">
              <strong>使用说明：</strong>
            </p>
            <ul style="margin: 0; padding-left: 20px">
              <li>支持标准 CSS 语法，包括嵌套写法</li>
              <li>样式会自动限定在当前表单作用域内，不会影响其他表单</li>
              <li>示例：<code>.my-class { color: red; }</code></li>
              <li>
                嵌套示例：<code
                  >.el-radio-button { .el-radio-button__inner { padding: 16px; } }</code
                >
              </li>
            </ul>
          </div>
        </template>
      </el-alert>

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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ref } from 'vue'

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
