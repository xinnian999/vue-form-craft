import type { FormItemType } from '@/types'

const recursionDelete = (
  items: FormItemType[],
  callback: (item: FormItemType) => boolean
): FormItemType[] => {
  const data = items.filter(callback)

  return data.map((item) => {
    if (item.items) {
      return {
        ...item,
        items: recursionDelete(item.items, callback)
      }
    }
    return item
  })
}

export default recursionDelete
