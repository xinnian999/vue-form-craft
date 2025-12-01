<template>
  <div :class="ns('code-editor')" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ns } from '@/utils'

// 配置 Monaco Editor 的 Worker 环境
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

export interface CodeEditorProps {
  language?: string
  readonly?: boolean
  theme?: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  height?: string | number
  options?: monaco.editor.IStandaloneEditorConstructionOptions
}

const props = withDefaults(defineProps<CodeEditorProps>(), {
  language: 'javascript',
  readonly: false,
  theme: 'vs',
  height: '400px',
  options: () => ({})
})

const modelValue = defineModel<string>({ default: '' })

const editorContainer = ref<HTMLElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const initEditor = () => {
  if (!editorContainer.value) return

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: modelValue.value,
    language: props.language,
    theme: props.theme,
    readOnly: props.readonly,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    tabSize: 2,
    folding: true, // 启用代码折叠
    foldingStrategy: 'indentation', // 折叠策略
    showFoldingControls: 'always', // 始终显示折叠控件
    ...props.options
  }

  editor = monaco.editor.create(editorContainer.value, editorOptions)

  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    if (editor) {
      modelValue.value = editor.getValue()
    }
  })
}

// 监听外部 modelValue 变化
watch(
  () => modelValue.value,
  (newValue) => {
    if (editor && editor.getValue() !== newValue) {
      editor.setValue(newValue || '')
    }
  }
)

// 监听语言变化
watch(
  () => props.language,
  (newLanguage) => {
    if (editor) {
      const model = editor.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, newLanguage)
      }
    }
  }
)

// 监听只读状态变化
watch(
  () => props.readonly,
  (newReadonly) => {
    if (editor) {
      editor.updateOptions({ readOnly: newReadonly })
    }
  }
)

// 监听主题变化
watch(
  () => props.theme,
  (newTheme) => {
    if (editor) {
      monaco.editor.setTheme(newTheme)
    }
  }
)

onMounted(() => {
  nextTick(() => {
    initEditor()
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
    editor = null
  }
})

// 暴露编辑器实例，方便外部调用
defineExpose({
  getEditor: () => editor
})
</script>

<style lang="scss" scoped>
@import '@/style.scss';

@include ns('code-editor') {
  width: 100%;
  height: v-bind(height);
  border: 1px solid $borderColor;
  border-radius: 4px;
  overflow: hidden;
}
</style>
