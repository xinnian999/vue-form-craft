import { isArray, isPlainObject, isString } from 'lodash'

// 性能优化：缓存Function实例，避免重复创建
const functionCache = new Map<string, Function>()

// 模板转换函数：支持整段 {{}} 表达式和普通字符串中的内嵌 {{}} 表达式
const templateParse = (str: string, context: Record<string, any>) => {
  if (!str) return str
  if (typeof str !== 'string') return str

  // 快速检测是否包含模板表达式
  if (!str.includes('{{') || !str.includes('}}')) return str

  const contextKeys = Object.keys(context).join(',')

  const getOrCreateFn = (expression: string) => {
    const cacheKey = `${contextKeys}:${expression}`

    let parse = functionCache.get(cacheKey)
    if (!parse) {
      parse = new Function(contextKeys, 'return ' + expression)

      // 限制缓存大小，避免内存泄漏
      if (functionCache.size > 500) {
        const firstKey = functionCache.keys().next().value
        if (firstKey !== undefined) {
          functionCache.delete(firstKey)
        }
      }

      functionCache.set(cacheKey, parse)
    }

    return parse
  }

  try {
    const contextValues = Object.values(context)

    // 1. 如果整个字符串就是一个 {{ expr }}，保持原有行为：直接返回计算结果
    const fullMatch = str.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/)
    if (fullMatch) {
      const expression = fullMatch[1]
      const parse = getOrCreateFn(expression)
      return parse(...contextValues)
    }

    // 2. 否则，处理内嵌表达式：逐个替换 {{ expr }} 为其字符串结果
    return str.replace(/\{\{([\s\S]+?)\}\}/g, (_, expr) => {
      try {
        const parse = getOrCreateFn(expr)
        const value = parse(...contextValues)
        // 将 undefined / null 安全转为空字符串，避免出现 "undefined" 字样
        return value == null ? '' : String(value)
      } catch {
        // 单个表达式出错时，保留原文本，避免整串报错
        return `{{${expr}}}`
      }
    })
  } catch (e) {
    // console.log({
    //   message: `模板转换错误：${str}`,
    //   context,
    //   reason: e
    // })

    return str
  }
}

const deepParse = (prop: any, context: Record<string, any>): any => {
  if (isString(prop)) {
    return templateParse(prop, context)
  }

  if (isPlainObject(prop)) {
    // 性能优化：使用for...in替代reduce，减少对象创建
    const result: Record<string, any> = {}
    for (const key in prop) {
      if (Object.prototype.hasOwnProperty.call(prop, key)) {
        result[key] = deepParse(prop[key], context)
      }
    }
    return result
  }

  if (isArray(prop)) {
    // 性能优化：使用传统for循环，比map稍快
    const length = prop.length
    const result = new Array(length)
    for (let i = 0; i < length; i++) {
      result[i] = deepParse(prop[i], context)
    }
    return result
  }

  return prop
}

export default deepParse
