import type { CompletionItem } from '@/types/complete'

/**
 * ========================================
 * ace补全工具函数
 * ========================================
 */

/**
 * 检查是否在表达式内部 ({{ }} 之间)
 * @param beforeCursor 光标前的文本
 */
export function isInExpression(beforeCursor: string): boolean {
  return beforeCursor.includes('{{') && !beforeCursor.includes('}}')
}

/**
 * 获取当前 value 位置对应的 key 名称
 * @param beforeCursor 光标前的文本
 */
export function getCurrentFieldName(beforeCursor: string): string | null {
  // 匹配最近的 "key": 模式
  const match = beforeCursor.match(/["'](\w+)["']\s*:\s*["']?[^"']*$/)
  return match ? match[1] : null
}

/**
 * 判断当前光标是否在 JSON 对象的 key 位置
 * @param beforeCursor 光标前的文本
 */
export function isInKeyPosition(beforeCursor: string): boolean {
  const trimmedLine = beforeCursor.trim()

  // 检查最后一个有意义的字符
  const lastMeaningfulChar = trimmedLine.replace(/["'\s]/g, '').slice(-1)

  // 如果前面是 { 或 , 说明在 key 位置
  if (lastMeaningfulChar === '{' || lastMeaningfulChar === ',') {
    return true
  }

  // 检查冒号和引号的位置关系
  const colonIndex = beforeCursor.lastIndexOf(':')
  const lastQuoteIndex = Math.max(beforeCursor.lastIndexOf('"'), beforeCursor.lastIndexOf("'"))

  // 如果最后一个引号在冒号之前，可能在 key 位置
  if (colonIndex === -1 || lastQuoteIndex > colonIndex) {
    const openBraceIndex = beforeCursor.lastIndexOf('{')
    const commaIndex = beforeCursor.lastIndexOf(',')
    const lastStructureChar = Math.max(openBraceIndex, commaIndex)

    // 检查结构字符后是否有冒号
    const textAfterStructure = beforeCursor.substring(lastStructureChar)
    return !textAfterStructure.includes(':')
  }

  return false
}

/**
 * 判断当前是否在 JSON 的根层级（表单全局配置层）
 * @param session Ace编辑器会话对象
 * @param pos 当前光标位置
 * @param beforeCursor 光标前的文本
 */
export function isAtRootLevel(session: any, pos: any, beforeCursor: string): boolean {
  try {
    // 获取从文档开始到当前位置的所有文本
    const textBeforeCursor = session.getLines(0, pos.row).join('\n') + beforeCursor

    let braceDepth = 0 // 大括号深度 {}
    let bracketDepth = 0 // 方括号深度 []
    let inString = false // 是否在字符串内
    let stringChar = '' // 字符串引号类型

    // 遍历所有字符，统计嵌套深度
    for (let i = 0; i < textBeforeCursor.length; i++) {
      const char = textBeforeCursor[i]
      const prevChar = i > 0 ? textBeforeCursor[i - 1] : ''

      // 处理字符串状态（忽略转义的引号）
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true
          stringChar = char
        } else if (char === stringChar) {
          inString = false
          stringChar = ''
        }
      }

      // 只在字符串外统计括号
      if (!inString) {
        if (char === '{') braceDepth++
        else if (char === '}') braceDepth--
        else if (char === '[') bracketDepth++
        else if (char === ']') bracketDepth--
      }
    }

    // 根层级：大括号深度为1，方括号深度为0
    return braceDepth === 1 && bracketDepth === 0
  } catch (error) {
    return false
  }
}

/**
 * 判断当前是否在 items 数组的第一层（表单项配置层）
 * @param session Ace编辑器会话对象
 * @param pos 当前光标位置
 * @param beforeCursor 光标前的文本
 */
export function isInItemsFirstLevel(session: any, pos: any, beforeCursor: string): boolean {
  try {
    // 获取从文档开始到当前位置的所有文本
    const textBeforeCursor = session.getLines(0, pos.row).join('\n') + beforeCursor

    let braceDepth = 0 // 大括号深度 {}
    let bracketDepth = 0 // 方括号深度 []
    let inString = false // 是否在字符串内
    let stringChar = '' // 字符串引号类型
    let inItemsArray = false // 是否进入了 items 数组
    let itemsArrayBracketDepth = 0 // items 数组的方括号深度

    // 遍历所有字符，统计嵌套深度
    for (let i = 0; i < textBeforeCursor.length; i++) {
      const char = textBeforeCursor[i]
      const prevChar = i > 0 ? textBeforeCursor[i - 1] : ''

      // 处理字符串状态（忽略转义的引号）
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true
          stringChar = char
        } else if (char === stringChar) {
          inString = false
          stringChar = ''
        }
      }

      // 只在字符串外统计括号
      if (!inString) {
        if (char === '{') braceDepth++
        else if (char === '}') braceDepth--
        else if (char === '[') {
          bracketDepth++
          // 检查是否是 items 数组的开始
          // 向前查找 "items" 关键字
          const beforeBracket = textBeforeCursor.substring(0, i)
          if (/["']items["']\s*:\s*$/.test(beforeBracket)) {
            inItemsArray = true
            itemsArrayBracketDepth = bracketDepth
          }
        } else if (char === ']') {
          // 如果退出了 items 数组
          if (inItemsArray && bracketDepth === itemsArrayBracketDepth) {
            inItemsArray = false
          }
          bracketDepth--
        }
      }
    }

    // items 第一层：在 items 数组内，且大括号深度为2（根对象1层 + items中的对象1层）
    return inItemsArray && braceDepth === 2 && bracketDepth === itemsArrayBracketDepth
  } catch (error) {
    return false
  }
}

/**
 * 根据字段名查找对应的枚举值
 * @param fieldName 字段名
 * @param configItems 配置项数组
 */
export function getEnumValues(
  fieldName: string | null,
  configItems: CompletionItem[]
): CompletionItem[] | null {
  if (!fieldName) return null

  const item = configItems.find((item) => item.name === fieldName)
  return item?.enum || null
}
