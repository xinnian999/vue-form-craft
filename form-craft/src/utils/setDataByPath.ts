import { cloneDeep } from 'lodash'

/**
 * 解析路径字符串，支持数组索引语法
 * 例如：'rules[0].required' => ['rules', '0', 'required']
 */
function parsePath(path: string): string[] {
  return path
    .replace(/\[(\d+)\]/g, '.$1') // 将 [0] 转换为 .0
    .split('.')
    .filter((key) => key !== '') // 过滤空字符串
}

const setDataByPath = (object: Record<string, any>, path: string, value: any) => {
  if (path === '.') {
    return value
  }

  // 直接修改原对象，不进行深拷贝
  // 这样可以确保连续多次调用时数据同步，避免响应式对象更新延迟问题
  const cloneObj = object

  // 将路径字符串分割成路径数组，支持数组索引
  const pathArray = parsePath(path)

  // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
  function update(obj: Record<string, any>, pathArray: string[], value: any) {
    // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
    if (pathArray.length === 1) {
      const key = pathArray[0]
      const index = Number(key)
      // 如果是数字索引且对象是数组，使用数字索引
      if (!isNaN(index) && Array.isArray(obj)) {
        obj[index] = value
      } else {
        obj[key] = value
      }
      return
    }

    // 获取当前路径的第一个部分
    const currentKey = pathArray[0]
    const currentIndex = Number(currentKey)

    // 下一级路径
    const nextKey = pathArray[1]
    const nextIndex = Number(nextKey)

    // 如果当前键是数字且父对象是数组
    if (!isNaN(currentIndex) && Array.isArray(obj)) {
      // 确保数组有足够的长度
      if (!obj[currentIndex]) {
        if (!isNaN(nextIndex)) {
          obj[currentIndex] = []
        } else {
          obj[currentIndex] = {}
        }
      }
      update(obj[currentIndex], pathArray.slice(1), value)
    } else {
      // 如果当前键不存在，则创建一个空对象/空数组
      if (!obj[currentKey]) {
        if (!isNaN(nextIndex)) {
          // 如果下一级是数字路径，则创建一个空数组
          obj[currentKey] = []
        } else {
          // 否则创建一个空对象
          obj[currentKey] = {}
        }
      }
      // 递归调用更新函数
      update(obj[currentKey], pathArray.slice(1), value)
    }
  }

  // 调用递归函数
  update(cloneObj, pathArray, value)

  // 返回更新后的对象
  return cloneObj
}

export default setDataByPath
