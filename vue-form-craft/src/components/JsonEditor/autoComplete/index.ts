/**
 * ========================================
 * JsonEditor 自动补全主入口
 * ========================================
 */

import JsonEditor from 'jsoneditor'
import { filterCompletionItems, getCompletionItems } from './completionProvider'

// import { setupTooltip } from './tooltip'

/**
 * 为 JsonEditor 设置自动补全功能
 * @param editor JsonEditor 实例
 */
export const setupAutoComplete = (editor: JsonEditor) => {
  const aceEditor = (editor as any)?.aceEditor
  if (!aceEditor) return

  try {
    const langTools = (window as any).ace?.require('ace/ext/language_tools')
    if (!langTools) return

    // 创建自定义补全器
    const formSchemaCompleter: any = {
      id: 'formSchemaCompleter',
      getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: Function) => {
        const line = session.getLine(pos.row)
        const beforeCursor = line.substring(0, pos.column)

        // 获取适合当前上下文的补全项
        const completionItems = getCompletionItems(session, pos, beforeCursor)

        // 过滤并格式化补全项
        const filteredItems = filterCompletionItems(completionItems, prefix)

        callback(null, filteredItems)
      }
    }

    // 配置 Ace 编辑器
    aceEditor.completers = [formSchemaCompleter] // 只使用自定义补全器

    aceEditor.setOptions({
      enableBasicAutocompletion: true, // 启用基础自动补全
      enableLiveAutocompletion: true, // 启用实时补全
      enableSnippets: false // 禁用代码片段
    })

    // 添加手动触发补全的快捷键
    aceEditor.commands.addCommand({
      name: 'triggerAutoComplete',
      bindKey: { win: 'Ctrl-Space', mac: 'Cmd-Space' },
      exec: (editor: any) => {
        editor.execCommand('startAutocomplete')
      }
    })

    // 自动配对大括号：输入 { 时自动补全 }
    aceEditor.commands.addCommand({
      name: 'autoPairBraces',
      bindKey: { win: '{', mac: '{' },
      exec: (editor: any) => {
        const session = editor.session
        const selectedText = editor.getSelectedText()
        const pos = editor.getCursorPosition()

        if (selectedText) {
          // 如果有选中文本，用大括号包裹
          editor.insert(`{${selectedText}}`)
        } else {
          // 没有选中文本，插入 {} 并将光标移到中间
          session.insert(pos, '{}')
          editor.moveCursorTo(pos.row, pos.column + 1)
        }

        return true
      }
    })

    // 设置字段悬停提示
    // setupTooltip(aceEditor)
  } catch (error) {
    console.debug('自动补全设置失败:', error)
  }
}

export default setupAutoComplete
