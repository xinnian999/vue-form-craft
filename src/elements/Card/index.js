import Card from './Card.vue'

export default {
  name: '卡片',
  component: Card,
  icon: 'card',
  type: 'layout',
  order: 1,
  isWrapper: true,
  isNotFormItem: true,
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
      component: 'ItemGroup',
      name: 'props',
      children: [{ label: '卡片标题', component: 'Input', name: 'header' }]
    }
  ]
}
