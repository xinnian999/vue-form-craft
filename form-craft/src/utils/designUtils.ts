import { cloneDeep } from 'lodash'
import type { FormItemType, FormSchema } from '@/types'
import getRandomId from './getRandomId'

export const getCurrentByKey = (items: FormItemType[], designKey: string): FormItemType | null => {
  return items.reduce<FormItemType | null>((all, item) => {
    if (item.designKey === designKey) {
      return item
    }
    if (item.children) {
      const res = getCurrentByKey(item.children, designKey)
      if (res) return res
    }

    return all
  }, null)
}

export const setCurrentByElement = (items: FormItemType[], element: FormItemType): FormItemType[] => {
  return items.map((item) => {
    if (item.designKey === element.designKey) {
      return element
    }
    if (item.children) {
      return { ...item, children: setCurrentByElement(item.children, element) }
    }
    return item
  })
}

const copyChildren = (children: FormItemType[]) => {
  return children.map((child) => {
    const data = { ...cloneDeep(child), designKey: `form-${getRandomId(4)}`, name: getRandomId(8) }

    if (child.children) {
      data.children = copyChildren(child.children)
    }

    return data
  })
}

export const copyItems = (list: FormItemType[], id: string): FormItemType[] => {
  return list.reduce<FormItemType[]>((all, current) => {
    if (current.children) {
      all.push({ ...current, children: copyItems(current.children, id) })
    } else {
      all.push(current)
    }

    if (current.designKey === id) {
      const newItem = {
        ...cloneDeep(current),
        designKey: `form-${getRandomId(4)}`,
        name: `${current.name}-${getRandomId(2)}`
      }
      if (current.children) {
        newItem.children = copyChildren(current.children)
      }
      if (current.label && !newItem.label?.includes('copy')) {
        newItem.label = newItem.label + ' copy'
      }
      all.push(newItem)
    }

    return all
  }, [])
}

export const repirItems = (items: FormItemType[]) => {
  return items.map((item: any) => {
    const data: FormItemType = {
      ...item,
      designKey: item.designKey || `design-${getRandomId(4)}`,
      name: item.name || `form-${getRandomId(4)}`
    }

    if (data.children) {
      data.children = repirItems(data.children)
    }

    return data
  })
}

export const repirJsonSchema = (schema: FormSchema) => {
  return {
    ...schema,
    items: repirItems(schema.items)
  }
}

// 递归移除 designKey 字段用于显示
export function removeDesignKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(removeDesignKeys)
  }
  if (obj && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {}
    for (const key in obj) {
      if (key !== 'designKey') {
        newObj[key] = removeDesignKeys((obj as Record<string, unknown>)[key])
      }
    }
    return newObj
  }
  return obj
}

// 递归恢复 designKey 字段
export function restoreDesignKeys(editedObj: unknown, originalObj: unknown): unknown {
  if (Array.isArray(editedObj) && Array.isArray(originalObj)) {
    return editedObj.map((item, index) => restoreDesignKeys(item, originalObj[index]))
  }
  if (
    editedObj &&
    typeof editedObj === 'object' &&
    originalObj &&
    typeof originalObj === 'object'
  ) {
    const newObj = { ...editedObj } as Record<string, unknown>
    const original = originalObj as Record<string, unknown>
    // 如果原对象有 designKey，恢复它
    if ('designKey' in original) {
      newObj.designKey = original.designKey
    }
    // 递归处理子属性
    for (const key in newObj) {
      if (key in original) {
        newObj[key] = restoreDesignKeys(newObj[key], original[key])
      }
    }
    return newObj
  }
  return editedObj
}
