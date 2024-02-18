import { isString, isPlainObject, isArray } from 'lodash'
import getDataByPath from './getDataByPath'

//模板转换函数，将一个由双大括号包裹的字符串，转化为js表达式并返回结果（context限制变量范围）
const templateParse = (str, context) => {
  if (!str) return str
  if (typeof str !== 'string') return str

  const template = str.match(/{{(.+?)}}/)
  if (template) {
    try {
      const parse = new Function(Object.keys(context).join(','), 'return ' + template[1])

      return parse(...Object.values(context))
    } catch (e) {
      // console.log(str, '模板转换错误：', e)
      return str
    }
  } else {
    return str
  }
}

const deepParse = (prop, context) => {
  const $values = context.$values

  if (isString(prop)) {
    return templateParse(prop, context)
  }
  if (isPlainObject(prop)) {
    return Object.keys(prop).reduce((all, key) => {
      const itemContext = { ...context }

      if (prop.name && $values) {
        const parentDataPathArr = prop.name.split('.')
        const parentDataPath = parentDataPathArr.slice(0, parentDataPathArr.length - 1).join('.')

        itemContext.$val = getDataByPath($values, prop.name)
        itemContext.$parentVal = getDataByPath($values, parentDataPath)
        itemContext.$opt = context.$selectData[prop.name]
      }

      return { ...all, [key]: deepParse(prop[key], itemContext) }
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
