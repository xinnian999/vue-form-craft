import type { formItemType, formItemsType } from '@/config/commonType'

const recursionDelete = (
  items: formItemsType,
  callback: (item: formItemType) => boolean
): formItemsType => {
  const data = items.filter(callback)

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: recursionDelete(item.children, callback)
      }
    }
    return item
  })
}

export default recursionDelete
