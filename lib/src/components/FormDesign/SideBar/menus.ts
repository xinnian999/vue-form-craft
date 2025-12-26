import type { FormElement } from '@/types'

type Params = {
  elements: Record<string, FormElement>
  omits: string[]
}

export default ({ elements, omits }: Params) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item.type === type && !omits.includes(item.component))
      .sort((a, b) => {
        return a.order - b.order
      })
  }

  const menus = [
    {
      title: '布局组件',
      children: getChildren('layout')
    },
    {
      title: '基础组件',
      children: getChildren('basic')
    },
    {
      title: '高级组件',
      children: getChildren('high')
    },
    {
      title: '辅助组件',
      children: getChildren('assist')
    }
  ]

  return menus
}
