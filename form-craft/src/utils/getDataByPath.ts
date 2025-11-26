import { parsePath } from './parsePath'

const getDataByPath = (obj: Record<string, any>, path: string = 'data') => {
  if (path === '.') {
    return obj
  }

  // 解析路径，支持数组索引语法
  const keys = parsePath(path)

  // 遍历路径，逐层深入对象
  let result = obj
  for (const key of keys) {
    if (result && typeof result === 'object') {
      const index = Number(key)
      // 如果是数字且当前对象是数组，使用数字索引
      if (!isNaN(index) && Array.isArray(result)) {
        result = result[index]
      } else if (key in result) {
        result = result[key]
      } else {
        // 如果路径无效，返回 undefined
        return undefined
      }
    } else {
      // 如果路径无效，返回 undefined
      return undefined
    }
  }

  return result
}
export default getDataByPath
