import { cloneDeep } from 'lodash'
import type { FormItemType, FormSchema } from '@/types'
import getRandomId from './getRandomId'

export const generateDesignKey = () => {
  return `design-${getRandomId(4)}`
}

export const generateName = () => {
  return `form-${getRandomId(4)}`
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
        designKey: generateDesignKey(),
        name: generateName()
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

export const repirNode = ({
  label,
  name,
  component,
  props,
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
    props,
    ...rest
  }

  return newNode
}

export const repirJsonSchema = (schema: FormSchema) => {
  const newSchema: FormSchema = schema

  const repirItems = (items: FormItemType[]) => {
    return items.map((item) => {
      const node: FormItemType = repirNode(item)

      if (node.children) {
        node.children = repirItems(node.children)
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

      if (newItem.children) {
        newItem.children = removeFromItems(newItem.children)
      }

      return newItem
    })
  }

  return {
    ...schema,
    items: removeFromItems(schema.items || [])
  }
}