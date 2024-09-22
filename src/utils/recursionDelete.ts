import type { FormItemType } from '@/config/commonType'

const recursionDelete = (
  items: FormItemType[],
  callback: (item: FormItemType) => boolean
): FormItemType[] => {
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
