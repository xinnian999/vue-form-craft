import { cloneDeep } from 'lodash'
import type { formValuesType } from '@/config/commonType'

const setDataByPath = (object: formValuesType, path: string, value: any) => {
  const cloneObj = cloneDeep(object)
  // 将路径字符串分割成路径数组
  const pathArray = path.split('.')
  // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
  function update(obj: formValuesType, pathArray: string[], value: any) {
    // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
    if (pathArray.length === 1) {
      obj[pathArray[0]] = value
      return
    }

    // 获取当前路径的第一个部分
    const currentKey = pathArray.shift()

    if (currentKey) {
      // 如果当前键不存在，则创建一个空对象
      if (!obj[currentKey]) {
        obj[currentKey] = {}
      }

      // 递归调用更新函数
      update(obj[currentKey], pathArray, value)
    }
  }

  // 调用递归函数
  update(cloneObj, pathArray, value)

  // 返回更新后的对象
  return cloneObj
}

export default setDataByPath
