<template>
  <div :class="ns('function-editor')">
    <div class="button-wrapper">
      <el-button type="primary" @click="openDialog" size="small">
        <template #icon>
          <Icon name="code" />
        </template>
        <span> 编辑函数</span>
      </el-button>
      <span v-if="hasValue" class="status-dot"></span>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="函数编辑器"
      width="800px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="function-editor-content">
        <div class="editor-tips">
          <div
            v-if="props.paramTips && props.paramTips.length"
            style="margin-top: 8px; font-size: 12px; color: #909399"
          >
            <div style="margin-bottom: 2px">可用参数：</div>
            <div v-for="item in props.paramTips" :key="item.name" style="margin-bottom: 2px">
              <code>{{ item.name }}</code>
              <span v-if="item.description"> - {{ item.description }}</span>
            </div>
          </div>
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
import { ElMessage } from 'element-plus'
import { computed, ref, shallowRef, watch } from 'vue'
import { Icon } from '@/components'
import { ns } from '@/utils'

const modelValue = defineModel<string>()

// 参数提示类型，仅用于编辑器上方展示，不参与代码生成
interface FunctionParamTip {
  name: string
  description?: string
}

// 定义 props
const props = defineProps<{
  /**
   * 参数提示列表，仅用于在编辑器顶部展示可用参数说明
   */
  paramTips?: FunctionParamTip[]
}>()

// 计算是否有值
const hasValue = computed(() => {
  const value = modelValue.value
  if (!value) return false
  // 移除 {{ }} 后检查是否有实际内容
  const code = value.replace(/^\{\{\s*|\s*\}\}$/g, '').trim()
  return code.length > 0
})

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
    // 清除之前的类型定义
    monaco.languages.typescript.javascriptDefaults.setExtraLibs([])

    // 启用语法检查，但关闭语义检查
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false, // 开启语义检查以支持类型推断
      noSyntaxValidation: false, // 保留语法检查
      diagnosticCodesToIgnore: [
        2304, // Cannot find name
        2552, // Cannot find name. Did you mean...
        2792, // Cannot find module
        7027, // Unreachable code detected
        7044 // Parameter implicitly has an 'any' type
      ]
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      noLib: false,
      allowJs: true,
      checkJs: true, // 开启 JS 检查以支持 JSDoc
      strict: false,
      noImplicitAny: false,
      strictNullChecks: false,
      strictFunctionTypes: false,
      noImplicitThis: false,
      alwaysStrict: false
    })

    // 配置 JavaScript 格式化选项（自动添加分号）
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)

    // 添加类型定义（用于智能提示）
    const libSource = `
declare const console: Console;

/**
 * 表单实例接口，提供各种操作方法
 */
interface FormInstance {
  /** 获取所有表单值 */
  getValues(): Record<string, any>;
  /** 设置所有表单值 */
  setValues(values: Record<string, any>): void;
  /** 获取指定字段的值 */
  getFieldValue(path: string): any;
  /** 设置指定字段的值 */
  setFieldValue(path: string, value: any): void;
  /** 验证表单 */
  validate(): Promise<any>;
  /** 重置表单 */
  resetFields(): void;
  /** 提交表单 */
  submit(): void;
  /** 更新选择数据 */
  updateSelectData(key: string, value: any): void;
}

/** 表单数据对象 */
declare const $values: Record<string, any>;

/** 选择数据对象 */
declare const $selectData: Record<string, any>;

/** 表单实例，提供各种操作方法 */
declare const $instance: FormInstance;

/** 当前项数据（在列表/自增容器中使用） */
declare const $item: any;

/** 当前项索引（在列表/自增容器中使用） */
declare const $index: number;
`

    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, 'ts:filename/params.d.ts')

    // 同时为 TypeScript 添加
    monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, 'ts:filename/params.d.ts')
  }
}

// 去除双大括号（用于编辑）
const removeBraces = (code: string): string => {
  if (!code) return ''
  const match = code.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/)
  return match ? match[1].trim() : code
}

// 添加默认函数模板（如果没有的话）
const addDefaultTemplate = (code: string): string => {
  if (code) return code

  const tips = props.paramTips || []
  if (!tips.length) {
    return '(...args) => {\n  \n}'
  }

  const paramsCode = tips.map((item) => item.name).join(', ')
  return `(${paramsCode}) => {\n  \n}`
}

// 添加双大括号（用于保存）
const addBraces = (code: string): string => {
  if (!code) return ''
  // 保留换行符，但清理多余的空行和首尾空白
  const cleanCode = code
    .split('\n')
    .map((line) => line.trimEnd()) // 移除每行末尾空白
    .join('\n')
    .trim() // 移除首尾空白
  return `{{ ${cleanCode} }}`
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
      error: '请输入完整的函数表达式，如：(...args) => ... 或 function(...args) { ... }'
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
  // 回显时移除 {{ }} 并添加默认模板
  const code = removeBraces(modelValue.value || '')
  editingCode.value = addDefaultTemplate(code)

  const isNewTemplate = !code
  dialogVisible.value = true

  // 等待编辑器挂载后再格式化
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (editorRef.value && editingCode.value) {
    try {
      // 使用 Monaco Editor 的格式化功能美化代码
      await editorRef.value.getAction('editor.action.formatDocument')?.run()

      // 如果是新建的模板，将光标定位到函数体内
      if (isNewTemplate) {
        const model = editorRef.value.getModel()
        if (model) {
          // 定位到第3行第3列（函数体内）
          editorRef.value.setPosition({ lineNumber: 3, column: 3 })
          editorRef.value.focus()
        }
      }
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

  // 保存时添加 {{ }}
  modelValue.value = code ? addBraces(code) : ''
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
}

// 监听外部值变化
watch(modelValue, (newVal) => {
  if (!dialogVisible.value) {
    editingCode.value = removeBraces(newVal || '')
  }
})
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('function-editor') {
  display: inline-block;

  .button-wrapper {
    position: relative;
    display: inline-block;
  }

  .status-dot {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 8px;
    height: 8px;
    background-color: $warningColor;
    border-radius: 50%;
    border: 2px solid $bgColor;
    box-shadow: 0 0 4px rgba(230, 162, 60, 0.5);
    pointer-events: none;
    z-index: 1;
  }

  .function-editor-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor-tips {
    code {
      background: $fillColorLight;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      color: $warningColor;
    }
  }

  .monaco-editor-wrapper {
    height: 400px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
