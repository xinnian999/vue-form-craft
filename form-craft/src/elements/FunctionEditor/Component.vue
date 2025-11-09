<template>
  <div class="function-editor">
    <el-button type="primary" @click="openDialog" size="small">
      <span>📝 编辑函数</span>
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      title="函数编辑器"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="function-editor-content">
        <div class="editor-tips">
          <el-alert type="warning" :closable="false" show-icon>
            <template #title>
              <div style="font-size: 13px; line-height: 1.6">
                <strong>📌 请输入完整的函数表达式</strong><br />
                <span style="color: #909399">示例：</span>
                <code>(params) => params.$values.age > 18</code> 或 
                <code>function(params) { return params.$values.name }</code><br />
                <span style="color: #909399">参数对象包含：</span>
                <code>$values</code>、<code>$selectData</code>、<code>$instance</code>、<code>$item</code>、<code>$index</code>、<code>args</code>
              </div>
            </template>
          </el-alert>
        </div>

        <div class="monaco-editor-wrapper">
          <vue-monaco-editor
            v-model:value="editingCode"
            language="javascript"
            :theme="'vs-dark'"
            :options="editorOptions"
            @mount="handleEditorMount"
          />
        </div>
      </div>

      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ref, shallowRef, watch } from 'vue'
import { ElMessage } from 'element-plus'

const modelValue = defineModel<string>()

const dialogVisible = ref(false)
const editingCode = ref('')
const editorRef = shallowRef()

// Monaco Editor 配置
const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on' as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: 'vs-dark',
  tabSize: 2,
  wordWrap: 'on' as const,
  suggest: {
    snippetsPreventQuickSuggestions: false
  },
  quickSuggestions: true,
  acceptSuggestionOnEnter: 'on' as const
}

// 编辑器挂载时的回调
const handleEditorMount = (editor: any) => {
  editorRef.value = editor

  // 添加自定义的智能提示
  const monaco = (window as any).monaco
  if (monaco) {
    // 启用语法检查，但关闭语义检查
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true, // 关闭语义检查（变量未定义等）
      noSyntaxValidation: false, // 保留语法检查
      diagnosticCodesToIgnore: [
        2304, // Cannot find name (忽略未定义变量的错误，因为 $values 等是运行时注入的)
        2552, // Cannot find name. Did you mean...
        2792, // Cannot find module
        7027 // Unreachable code detected
      ]
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      noLib: false,
      allowJs: true,
      checkJs: false,
      strict: false,
      noImplicitAny: false,
      strictNullChecks: false,
      strictFunctionTypes: false,
      noImplicitThis: false,
      alwaysStrict: false
    })

    // 配置 JavaScript 格式化选项（自动添加分号）
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)

    // 添加全局变量的类型定义（用于智能提示和避免报错）
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
      declare const console: Console;
      declare const $values: Record<string, any>;
      declare const $selectData: Record<string, any>;
      declare const $instance: {
        getValues(): Record<string, any>;
        setValues(values: Record<string, any>): void;
        getFieldValue(path: string): any;
        setFieldValue(path: string, value: any): void;
        validate(): Promise<any>;
        resetFields(): void;
        submit(): void;
        updateSelectData(key: string, value: any): void;
      };
      declare const $item: any;
      declare const $index: number;
    `,
      'ts:filename/context.d.ts'
    )

    // 配置格式化选项 - 强制使用分号
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })
  }
}

// 验证是否为完整的函数表达式
const validateFunction = (code: string): { valid: boolean; error?: string } => {
  if (!code.trim()) {
    return { valid: true } // 空代码允许
  }

  const trimmedCode = code.trim()
  
  // 检查是否为箭头函数或普通函数
  const isArrowFunction = /^\(.*?\)\s*=>/.test(trimmedCode) || /^\w+\s*=>/.test(trimmedCode)
  const isNormalFunction = /^function\s*\(/.test(trimmedCode)
  
  if (!isArrowFunction && !isNormalFunction) {
    return {
      valid: false,
      error: '请输入完整的函数表达式，如：(params) => ... 或 function(params) { ... }'
    }
  }

  try {
    // 尝试评估函数表达式
    new Function(`return (${trimmedCode})`)
    return { valid: true }
  } catch (error: any) {
    return {
      valid: false,
      error: `函数语法错误: ${error.message}`
    }
  }
}

const openDialog = async () => {
  editingCode.value = modelValue.value || ''
  dialogVisible.value = true

  // 等待编辑器挂载后再格式化
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (editorRef.value && editingCode.value) {
    try {
      // 使用 Monaco Editor 的格式化功能美化代码
      await editorRef.value.getAction('editor.action.formatDocument')?.run()
    } catch (e) {
      console.warn('格式化失败', e)
    }
  }
}

const handleSave = async () => {
  let code = editingCode.value.trim()

  if (code && editorRef.value) {
    // 获取当前编辑器的代码
    code = editorRef.value.getValue().trim()
  }

  // 验证函数
  if (code) {
    const validation = validateFunction(code)
    if (!validation.valid) {
      ElMessage.error({
        message: validation.error || '函数验证失败',
        duration: 4000
      })
      return // 验证失败，不关闭对话框
    }
  }

  modelValue.value = code
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
}

// 监听外部值变化
watch(modelValue, (newVal) => {
  if (!dialogVisible.value) {
    editingCode.value = newVal || ''
  }
})
</script>

<style scoped>
.function-editor {
  display: inline-block;
}

.function-editor-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.editor-tips {
  margin-bottom: 8px;
}

.editor-tips code {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 12px;
  color: #e6a23c;
}

.monaco-editor-wrapper {
  height: 400px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}
</style>
