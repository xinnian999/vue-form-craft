<template>
  <Disabled :disabled="disabled" class="jsonEdit-disabled">
    <div ref="jsonEditorEl" style="height: 550px"></div>
  </Disabled>
</template>

<script setup lang="ts">
import JsonEditor from 'jsoneditor'
import type { JSONEditorOptions } from 'jsoneditor'
import { nextTick, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import 'jsoneditor/dist/jsoneditor.min.css'
import { Disabled } from '@/components'

defineOptions({
  inheritAttrs: false
})

defineProps<{ disabled?: boolean }>()

const modelValue = defineModel<Record<string, any>>()

const jsonEditorEl = useTemplateRef<HTMLElement>('jsonEditorEl')

let editor: JsonEditor | null = null
let internalChange = false // 标记是否为内部变化，避免循环更新

const fixJson = () => {
  if (!editor) return

  try {
    // 获取当前文本内容
    const text = editor.getText()
    if (!text || text.trim() === '') return

    // 尝试解析并格式化JSON
    const jsonData = editor.get()
    // 重新设置，会自动格式化
    editor.set(jsonData)
  } catch (error) {
    // JSON格式错误时，不做处理，保持用户输入
    console.debug('JSON format error on blur:', error)
  }
}

// 1. 初始化 JsonEditor 实例
const init = () => {
  const options: JSONEditorOptions = {
    mode: 'code',
    modes: ['tree', 'code', 'form', 'text', 'view'],
    indentation: 2,
    onBlur() {
      fixJson()
    },
    onChange() {
      try {
        const jsonData = editor?.get()
        // 标记为内部变化
        internalChange = true
        modelValue.value = jsonData
        nextTick(() => {
          internalChange = false
        })
      } catch (error) {
        console.debug('JSON parse error:', error)
      }
    },
    onModeChange(newMode) {
      if (newMode === 'code') {
        nextTick(() => setupAutoComplete())
      }
    }
  }

  if (jsonEditorEl.value) {
    editor = new JsonEditor(jsonEditorEl.value, options, modelValue.value || {})
    nextTick(() => setupAutoComplete())
  }
}

// 设置 Ace 编辑器自动完成
const setupAutoComplete = () => {
  const aceEditor = (editor as any)?.aceEditor
  if (!aceEditor) return

  try {
    aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: false,
      enableSnippets: true
    })

    const langTools = (window as any).ace?.require('ace/ext/language_tools')
    if (!langTools) return

    // 自定义补全器
    const completer: any = {
      id: 'formExprCompleter',
      getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: Function) => {
        const line = session.getLine(pos.row)
        const beforeCursor = line.substring(0, pos.column)

        if (beforeCursor.endsWith('{{')) {
          callback(null, [
            { caption: '$values', value: '$values', meta: '表单数据对象', score: 1000 },
            { caption: '$values.', value: '$values.', meta: '访问表单字段', score: 999 }
          ])
        } else {
          callback(null, [])
        }
      }
    }

    // 添加补全器
    aceEditor.completers = (aceEditor.completers || []).filter((c: any) => c.id !== 'formExprCompleter')
    aceEditor.completers.push(completer)

    // 监听 { 键触发补全
    aceEditor.commands.addCommand({
      name: 'triggerAutoComplete',
      bindKey: { win: '{', mac: '{' },
      exec: (editor: any) => {
        editor.insert('{')
        const pos = editor.getCursorPosition()
        const line = editor.session.getLine(pos.row)
        if (line.substring(0, pos.column).endsWith('{{')) {
          setTimeout(() => editor.execCommand('startAutocomplete'), 50)
        }
      }
    })
  } catch (error) {
    console.debug('Setup autocomplete error:', error)
  }
}

// 2. 监听 modelValue 变化，实现数据双向绑定
watch(
  modelValue,
  (newValue) => {
    // 如果是内部变化触发的，不需要再次设置
    if (internalChange || !editor) return

    try {
      editor.set(newValue || {})
    } catch (error) {
      console.debug('Set editor value error:', error)
    }
  },
  { deep: true }
)

// 生命周期：挂载时初始化
onMounted(() => {
  init()
})

// 生命周期：卸载时销毁编辑器
onUnmounted(() => {
  editor?.destroy()
  editor = null
})
</script>

<style>
.jsonEdit-disabled {
  width: 100%;
  opacity: 0.7;
}
</style>
