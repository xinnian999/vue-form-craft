import { isArray, isPlainObject, isString } from 'lodash'

//模板转换函数，将一个由双大括号包裹的字符串，转化为并返回结果（context限制变量范围）
const templateParse = (str: string, context: Record<string, any>) => {
  // console.log(JSON.stringify(context.$selectData) );
  if (!str) return str
  if (typeof str !== 'string') return str

  const template = str.match(/{{(.+?)}}/)
  if (template) {
    try {
      const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])

      return parse(...Object.values(context))
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

// 解析函数字符串为真实函数（用于事件处理器）
const parseFunctionString = (str: string, context: Record<string, any>) => {
  if (!str) return str
  if (typeof str !== 'string') return str

  try {
    // 直接解析函数表达式（不需要双大括号包裹）
    const func = new Function('return ' + str.trim())()

    // 返回一个包装函数，将原始事件参数和 context 合并成一个对象传递给函数
    return (...args: any[]) => {
      const mergedParams = { ...context, args }
      return func(mergedParams)
    }
  } catch (e) {
    console.warn('函数解析错误：', str, e)
    return str
  }
}

const deepParse = (prop: any, context: Record<string, any>): any => {
  if (isString(prop)) {
    return templateParse(prop, context)
  }

  if (isPlainObject(prop)) {
    return Object.keys(prop).reduce((all, key) => {
      // 如果当前 key 是事件处理器（以 on 开头），则解析为函数
      if (key.startsWith('on') && isString(prop[key])) {
        return { ...all, [key]: parseFunctionString(prop[key], context) }
      }
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
