const getDataByPath = (obj, path) => {
  // 使用正则表达式分割路径字符串
  const keys = path.split('.')

  // 遍历路径，逐层深入对象
  let result = obj
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      // 如果路径无效，返回 undefined 或者其他默认值
      return undefined
    }
  }

  return result
}
export default getDataByPath
