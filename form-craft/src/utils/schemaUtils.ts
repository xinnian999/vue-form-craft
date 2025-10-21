import type { FormItemType, FormSchema } from '@/types'

const schemaUtils = (get: () => FormSchema, set?: (schema: FormSchema) => void) => {
  const getNode = (items: FormItemType[], designKey: string): FormItemType | null => {
    return items.reduce<FormItemType | null>((acc, cur) => {
      if (cur.designKey === designKey) {
        return cur
      }
      if (cur.children) {
        const res = getNode(cur.children, designKey)
        if (res) return res
      }

      return acc
    }, null)
  }

  const getNodeByKey = (designKey: string): FormItemType | null => {
    const schema = get()

    return getNode(schema.items, designKey)
  }

  return {
    getNodeByKey
  }
}

export default schemaUtils
