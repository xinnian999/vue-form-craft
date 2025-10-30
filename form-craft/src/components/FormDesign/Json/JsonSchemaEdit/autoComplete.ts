/**
 * ========================================
 * JsonEditor 自动补全主入口
 * ========================================
 */

import JsonEditor from 'jsoneditor'
import { EXPRESSION_ITEMS, FORM_CONFIG_ITEMS, FORM_ITEM_CONFIG_ITEMS } from '@/config'
import type { CompletionItem, GetCompletionItems } from '@/types/complete'
import { getCurrentFieldName, getEnumValues, isAtRootLevel, isInExpression, isInItemsFirstLevel, isInKeyPosition } from '@/utils'
import type { FormSchema, FormItemType } from '@/types'

/**
 * 递归提取 schema 中所有字段的 name 和 label
 * @param items 表单项数组
 * @param result 结果数组
 */
function extractFieldNames(items: FormItemType[] = [], result: Array<{ name: string; label: string }> = []): Array<{ name: string; label: string }> {
  for (const item of items) {
    if (item.name) {
      result.push({
        name: item.name,
        label: item.label || item.name
      })
    }
    // 递归处理子项
    if (item.children && item.children.length > 0) {
      extractFieldNames(item.children, result)
    }
  }
  return result
}

/**
 * 根据上下文获取合适的补全项
 * @param session Ace编辑器会话对象
 * @param pos 当前光标位置
 * @param beforeCursor 光标前的文本
 */
const getCompletionItems: GetCompletionItems = ({ session, pos, beforeCursor, schema }) => {
  // 在表达式内部（{{ }} 之间），提供表达式变量
  if (isInExpression(beforeCursor)) {
    // 检查是否输入了 $values.
    const valuesMatch = beforeCursor.match(/\$values\.([\w]*)$/)

    if (valuesMatch) {
      // 如果输入了 $values.，提供字段名补全
      if (schema && schema.items) {
        const fields = extractFieldNames(schema.items)
        return fields.map((field, index) => ({
          name: field.name,
          meta: field.label,
          score: 1000 - index
        }))
      }
      return []
    }

    // 否则提供基础表达式变量
    return EXPRESSION_ITEMS
  }

  // 在 key 位置
  if (isInKeyPosition(beforeCursor)) {
    // 优先判断是否在根层级（表单全局配置）
    if (isAtRootLevel(session, pos, beforeCursor)) {
      return FORM_CONFIG_ITEMS
    }

    // 判断是否在 items 数组的第一层（表单项配置）
    if (isInItemsFirstLevel(session, pos, beforeCursor)) {
      return FORM_ITEM_CONFIG_ITEMS
    }

    // 其他层级（items 内部的深层嵌套）：不提供配置项补全
    return []
  }

  // 在 value 位置
  // 1. 先检查是否有枚举值
  const fieldName = getCurrentFieldName(beforeCursor)

  // 优先在根层级配置中查找枚举值
  let enumValues = getEnumValues(fieldName, FORM_CONFIG_ITEMS)

  // 如果没找到，在表单项配置中查找
  if (!enumValues) {
    enumValues = getEnumValues(fieldName, FORM_ITEM_CONFIG_ITEMS)
  }

  // 2. 如果找到枚举值，直接返回（枚举值已经是 CompletionItem[] 格式）
  if (enumValues) {
    return enumValues
  }

  // 3. 否则无补全
  return []
}

/**
 * 过滤和格式化补全项
 * @param items 原始补全项
 * @param prefix 输入前缀
 */
function filterCompletionItems(items: CompletionItem[], prefix: string) {
  const cleanPrefix = prefix.replace(/['"]]/g, '').toLowerCase()

  return items
    .filter((item) => item.name.toLowerCase().includes(cleanPrefix))
    .map((item) => ({
      caption: item.name,
      value: item.name, // 使用 name 作为插入值
      meta: item.meta,
      score: item.score
    }))
}

/**
 * 为 JsonEditor 设置自动补全功能
 * @param editor JsonEditor 实例
 */
export const setupAutoComplete = (
  editor: JsonEditor,
  customGetCompletionItems?: GetCompletionItems,
  schema?: FormSchema
) => {
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
        const completionItems = getCompletionItems({ session, pos, beforeCursor, schema })

        if (customGetCompletionItems) {
          completionItems.push(...customGetCompletionItems({ session, pos, beforeCursor, schema }))
        }

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

    // 输入 . 时自动触发补全（用于 $values. 后的字段补全）
    aceEditor.commands.addCommand({
      name: 'autoCompleteDot',
      bindKey: { win: '.', mac: '.' },
      exec: (editor: any) => {
        const session = editor.session
        const pos = editor.getCursorPosition()

        // 插入 .
        session.insert(pos, '.')

        // 获取光标前的文本
        const line = session.getLine(pos.row)
        const beforeCursor = line.substring(0, pos.column + 1)

        // 如果在表达式内且刚输入了 $values.，自动触发补全
        if (isInExpression(beforeCursor) && beforeCursor.endsWith('$values.')) {
          // 延迟触发补全，确保 . 已经插入
          setTimeout(() => {
            editor.execCommand('startAutocomplete')
          }, 10)
        }

        return true
      }
    })

    // 监听补全选择事件，当选择 $values. 后自动触发字段补全
    aceEditor.on('changeSelection', () => {
      const pos = aceEditor.getCursorPosition()
      const session = aceEditor.session
      const line = session.getLine(pos.row)
      const beforeCursor = line.substring(0, pos.column)

      // 如果光标前是 $values. 且在表达式内，自动触发补全
      if (isInExpression(beforeCursor) && beforeCursor.endsWith('$values.')) {
        // 延迟触发，避免与当前补全冲突
        setTimeout(() => {
          // 再次检查，确保用户没有继续输入
          const currentPos = aceEditor.getCursorPosition()
          const currentLine = session.getLine(currentPos.row)
          const currentBeforeCursor = currentLine.substring(0, currentPos.column)

          if (currentBeforeCursor.endsWith('$values.')) {
            aceEditor.execCommand('startAutocomplete')
          }
        }, 50)
      }
    })

    // 设置字段悬停提示
    // setupTooltip(aceEditor)
  } catch (error) {
    console.debug('自动补全设置失败:', error)
  }
}

export default setupAutoComplete
