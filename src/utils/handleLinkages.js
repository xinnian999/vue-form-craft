import { isArray, cloneDeep, isEqual } from 'lodash'

const updateObjectAtPath = (obj, path, value) => {
  // 将路径字符串分割成路径数组
  const pathArray = path.split('.')

  // 递归函数，用于在对象的深层级找到要修改的位置并更新其值
  function update(obj, pathArray, value) {
    // 如果路径数组为空，表示已经到达了最后一级，更新值并返回
    if (pathArray.length === 1) {
      obj[pathArray[0]] = value
      return
    }

    // 获取当前路径的第一个部分
    const currentKey = pathArray.shift()

    // 如果当前键不存在，则创建一个空对象
    if (!obj[currentKey]) {
      obj[currentKey] = {}
    }

    // 递归调用更新函数
    update(obj[currentKey], pathArray, value)
  }

  // 调用递归函数
  update(obj, pathArray, value)

  // 返回更新后的对象
  return obj
}

const handleLinkages = ({ newVal, oldVal, formValues, formItems }) => {
  const tempFormValues = cloneDeep(formValues.value)
  for (const item of formItems) {
    if (item.change && !isEqual(newVal[item.name], oldVal[item.name])) {
      item.change.forEach(({ target, value }) => {
        updateObjectAtPath(tempFormValues, target, value)
      })
      formValues.value = tempFormValues
    }

    if (item.children) {
      handleLinkages({
        newVal: newVal[item.name],
        oldVal: oldVal[item.name],
        formValues,
        formItems: item.children
      })
    }
  }
}

export default handleLinkages
