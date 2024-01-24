import { ElCard } from 'element-plus'

export default {
  name: '卡片',
  component: ElCard,
  initialValues: {
    component: 'card',
    children: [],
    props: {
      header: '卡片'
    }
  },
  attr: [
    { label: '字段标识', component: 'input', name: 'name' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [{ label: '卡片标题', component: 'input', name: 'header' }]
    }
  ]
}
