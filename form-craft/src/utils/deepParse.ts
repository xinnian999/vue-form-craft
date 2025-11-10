import { isArray, isPlainObject, isString } from 'lodash'

// 模板转换函数，将一个由双大括号包裹的字符串，转化为并返回结果（context限制变量范围）
// 如果返回值是函数，会自动包装并传入 context + args
const templateParse = (str: string, context: Record<string, any>) => {
  if (!str) return str
  if (typeof str !== 'string') return str

  // 使用 [\s\S] 来匹配包括换行符在内的所有字符
  const template = str.match(/\{\{([\s\S]+?)\}\}/)
  if (template) {
    try {
      // console.log('匹配到{{ }}模板:', str)
      const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])
      const result = parse(...Object.values(context))

      // 如果解析结果是函数，包装它，将 context 和原始参数合并后传入
      if (typeof result === 'function') {
        return (...args: any[]) => {
          const mergedParams = { ...context, args }
          return result(mergedParams)
        }
      }

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
    return Object.keys(prop).reduce((all, key) => {
      return { ...all, [key]: deepParse(prop[key], context) }
    }, {})
  }

  if (isArray(prop)) {
    return prop.map((item) => {
      return deepParse(item, context)
    })
  }

  return prop
}

export default deepParse
