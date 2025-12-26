import { cloneDeep } from 'lodash'
import type { FormItemType, FormSchema } from '@/types'
import getRandomId from './getRandomId'

export const generateDesignKey = () => {
  return `design-${getRandomId(4)}`
}

export const generateName = () => {
  return `form-${getRandomId(4)}`
}

const copyItemsRecursive = (items: FormItemType[]) => {
  return items.map((item) => {
    const data = { ...cloneDeep(item), designKey: `form-${getRandomId(4)}`, name: getRandomId(8) }

    if (item.items) {
      data.items = copyItemsRecursive(item.items)
    }

    return data
  })
}

export const copyItems = (list: FormItemType[], id: string): FormItemType[] => {
  return list.reduce<FormItemType[]>((all, current) => {
    if (current.items) {
      all.push({ ...current, items: copyItems(current.items, id) })
    } else {
      all.push(current)
    }

    if (current.designKey === id) {
      const newItem = {
        ...cloneDeep(current),
        designKey: generateDesignKey(),
        name: generateName()
      }
      if (current.items) {
        newItem.items = copyItemsRecursive(current.items)
      }
      if (current.label && !newItem.label?.includes('copy')) {
        newItem.label = newItem.label + ' copy'
      }
      all.push(newItem)
    }

    return all
  }, [])
}

export const repirNode = ({
  label,
  name,
  component,
  componentProps,
  designKey,
  alert,
  ...rest
}: FormItemType) => {
  const newNode: FormItemType = {
    label,
    name: name || generateName(),
    designKey: designKey || generateDesignKey(),
    alert,
    component,
    componentProps,
    ...rest
  }

  return newNode
}

export const repirJsonSchema = (schema: FormSchema) => {
  const newSchema: FormSchema = schema

  const repirItems = (items: FormItemType[]) => {
    return items.map((item) => {
      const node: FormItemType = repirNode(item)

      if (node.items) {
        node.items = repirItems(node.items)
      }

      return node
    })
  }

  newSchema.items = repirItems(newSchema.items || [])

  return newSchema
}

/**
 * 移除 schema 中所有的 designKey（用于 JSON 编辑时展示，隐藏设计器内部字段）
 */
export const removeDesignKeys = (schema: FormSchema): FormSchema => {
  const removeFromItems = (items: FormItemType[]): FormItemType[] => {
    return items.map((item) => {
      const { designKey, ...rest } = item
      const newItem: FormItemType = { ...rest }

      if (newItem.items) {
        newItem.items = removeFromItems(newItem.items)
      }

      return newItem
    })
  }

  return {
    ...schema,
    items: removeFromItems(schema.items || [])
  }
}
