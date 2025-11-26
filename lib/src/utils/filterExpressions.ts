import { isArray, isPlainObject, isString } from 'lodash'

/**
 * 过滤掉所有 JS 表达式的工具函数
 *
 * 在设计态下，所有表达式都不会被解析，传给组件可能导致显示异常，因此统一过滤
 *
 * @param obj - 需要过滤的对象、数组或字符串
 * @returns 过滤后的结果，JS 表达式会被替换为 undefined
 */
const filterExpressions = (obj: any): any => {
  if (isString(obj)) {
    // 如果是 JS 表达式字符串（包含 {{ }}），返回 undefined
    if (obj.match(/\{\{[\s\S]+?\}\}/)) {
      return undefined
    }
    return obj
  }

  if (isPlainObject(obj)) {
    const result: Record<string, any> = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const filtered = filterExpressions(obj[key])
        // 只保留非 undefined 的值
        if (filtered !== undefined) {
          result[key] = filtered
        }
      }
    }
    return result
  }

  if (isArray(obj)) {
    return obj.map((item: any) => filterExpressions(item))
  }

  return obj
}

export default filterExpressions
