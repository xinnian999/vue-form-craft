import { cloneDeep } from 'lodash'

const setDataByPath = (object: Record<string, any>, path: string, value: any) => {
  // 深拷贝对象，避免直接修改原对象
  const cloneObj = cloneDeep(object)

  // 将路径字符串分割成路径数组
  const pathArray = path.split('.')

  // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
  function update(obj: Record<string, any>, pathArray: string[], value: any) {
    // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
    if (pathArray.length === 1) {
      obj[pathArray[0]] = value
      return
    }

    // 获取当前路径的第一个部分
    const currentKey = pathArray[0]
    
    // 下一级路径
    const nextKey = pathArray[1]

    // 如果当前键不存在，则创建一个空对象/空数组
    if (!obj[currentKey]) {
      if (!isNaN(Number(nextKey))) {
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

  // 调用递归函数
  update(cloneObj, pathArray, value)

  // 返回更新后的对象
  return cloneObj
}

export default setDataByPath
