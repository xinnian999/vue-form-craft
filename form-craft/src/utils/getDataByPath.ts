/**
 * 解析路径字符串，支持数组索引语法
 * 例如：'rules[0].required' => ['rules', '0', 'required']
 */
function parsePath(path: string): string[] {
  return path
    .replace(/\[(\d+)\]/g, '.$1') // 将 [0] 转换为 .0
    .split('.')
    .filter(key => key !== '') // 过滤空字符串
}

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
