import { cloneDeep } from 'lodash'
import { initSchema } from '@/config'
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

export const repirNode = ({ label, name, component, props, designKey, ...rest }: FormItemType) => {
  const newNode: FormItemType = {
    label,
    name: name || generateName(),
    component,
    props,
    designKey: designKey || generateDesignKey(),
    ...rest
  }

  return newNode
}

export const repirJsonSchema = (schema: FormSchema) => {
  const newSchema: FormSchema = { ...initSchema, ...schema }

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
