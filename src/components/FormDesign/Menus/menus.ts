import type { FormElement } from '@/release'

export default (elements: Record<string,FormElement>) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item?.type === type)
      .sort((a, b) => {
        return a.order - b.order
      })
  }

  const menus = [
    {
      title: '基础字段',
      children: getChildren('basic')
    },
    {
      title: '布局字段',
      children: getChildren('layout')
    },
    {
      title: '辅助字段',
      children: getChildren('assist')
    }
  ]

  return menus
}
