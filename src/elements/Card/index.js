import { ElCard } from 'element-plus'

export default {
  name: '卡片',
  component: ElCard,
  icon: 'card',
  type: 'layout',
  order: 1,
  initialValues: {
    component: 'Card',
    children: [],
    props: {
      header: '卡片'
    }
  },
  attr: [
    { label: '字段标识', component: 'Input', name: 'name' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [{ label: '卡片标题', component: 'Input', name: 'header' }]
    }
  ]
}
