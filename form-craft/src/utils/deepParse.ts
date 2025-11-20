import { isArray, isPlainObject, isString } from 'lodash'

// 性能优化：缓存Function实例，避免重复创建
const functionCache = new Map<string, Function>()

// 模板转换函数，将一个由双大括号包裹的字符串，转化为并返回结果（context限制变量范围）
const templateParse = (str: string, context: Record<string, any>) => {
  if (!str) return str
  if (typeof str !== 'string') return str

  // 使用 [\s\S] 来匹配包括换行符在内的所有字符
  const template = str.match(/\{\{([\s\S]+?)\}\}/)
  if (template) {
    try {
      const expression = template[1]
      const contextKeys = Object.keys(context).join(',')
      const cacheKey = `${contextKeys}:${expression}`

      // 尝试从缓存获取Function实例
      let parse = functionCache.get(cacheKey)
      if (!parse) {
        parse = new Function(contextKeys, 'return ' + expression)
        // 限制缓存大小，避免内存泄漏
        if (functionCache.size > 500) {
          // 清除最早的缓存项
          const firstKey = functionCache.keys().next().value
          if (firstKey !== undefined) {
            functionCache.delete(firstKey)
          }
        }
        functionCache.set(cacheKey, parse)
      }

      const result = parse(...Object.values(context))

      return result
    } catch (e) {
      // console.log({
      //   message: `模板转换错误：${str}`,
      //   context,
      //   reason: e
      // })

      return str
    }
  } else {
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
