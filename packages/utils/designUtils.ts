import type { FormItemType } from '@vue-form-craft/types'
import { getRandomId } from '@vue-form-craft/utils'
import { cloneDeep } from 'lodash'

export const getCurrentByKey = (items: FormItemType[], key: string): FormItemType | null => {
  return items.reduce<FormItemType | null>((all, item) => {
    if (item.designKey === key) {
      return item
    }
    if (item.children) {
      const res = getCurrentByKey(item.children, key)
      if (res) return res
    }

    return all
  }, null)
}

export const setCurrentByKey = (items: FormItemType[], element: FormItemType): FormItemType[] => {
  return items.map((item) => {
    if (item.designKey === element.designKey) {
      return element
    }
    if (item.children) {
      return { ...item, children: setCurrentByKey(item.children, element) }
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
        name: getRandomId(8)
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

export const changeItems = (items: FormItemType[]) => {
  return items.map((item: any) => {
    const config = item.initialValues || item

    const data = {
      ...config,
      designKey: config.designKey || `design-${getRandomId(4)}`,
      name: config.name || `form-${getRandomId(4)}`
    }

    if (config.children) {
      data.children = changeItems(config.children)
    }

    return data
  })
}
