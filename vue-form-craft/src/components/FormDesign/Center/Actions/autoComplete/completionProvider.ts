/**
 * ========================================
 * 补全项提供器
 * 根据上下文提供合适的补全项
 * ========================================
 */

import type { CompletionItem } from './items'
import { FORM_CONFIG_ITEMS, FORM_ITEM_CONFIG_ITEMS, EXPRESSION_ITEMS, COMPONENT_ITEMS } from './items'
import { isInExpression, isInKeyPosition, isAtRootLevel, isInItemsFirstLevel, getCurrentFieldName } from './contextAnalyzer'

/**
 * 根据字段名查找对应的枚举值
 * @param fieldName 字段名
 * @param configItems 配置项数组
 */
function getEnumValues(fieldName: string | null, configItems: CompletionItem[]): CompletionItem[] | null {
  if (!fieldName) return null

  const item = configItems.find(item => item.name === fieldName)
  return item?.enum || null
}

/**
 * 根据上下文获取合适的补全项
 * @param session Ace编辑器会话对象
 * @param pos 当前光标位置
 * @param beforeCursor 光标前的文本
 */
export function getCompletionItems(session: any, pos: any, beforeCursor: string): CompletionItem[] {
  // 在表达式内部（{{ }} 之间），提供表达式变量
  if (isInExpression(beforeCursor)) {
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

  // 3. 否则返回组件选项
  return COMPONENT_ITEMS
}

/**
 * 过滤和格式化补全项
 * @param items 原始补全项
 * @param prefix 输入前缀
 */
export function filterCompletionItems(items: CompletionItem[], prefix: string) {
  const cleanPrefix = prefix.replace(/['"]]/g, '').toLowerCase()

  return items
    .filter(item => item.name.toLowerCase().includes(cleanPrefix))
    .map(item => ({
      caption: item.name,
      value: item.name,  // 使用 name 作为插入值
      meta: item.meta,
      score: item.score
    }))
}
