import elements from '@/elements'

const getChildren = (type) => {
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
    title: '高级字段',
    children: getChildren('high')
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

export default menus
