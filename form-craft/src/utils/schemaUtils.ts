import type { DesignInstance, FormItemType, FormSchema } from '@/types'

const schemaUtils = (get: () => FormSchema, set: DesignInstance['setSchema'] = () => { }) => {
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

  const updateNodeByKey = (designKey: string, newNodeData: Record<string, any>) => {
    const schema = get()
    const oldNode = designKey === 'root' ? schema : getNode(schema.items, designKey)
    if (oldNode) {
      Object.assign(oldNode, newNodeData)
      set(schema, { saveHistory: false, repir: false })
    }
  }

  return {
    getNodeByKey,
    updateNodeByKey
  }
}

export default schemaUtils
