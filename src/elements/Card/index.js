import Card from './Card.vue'

export default {
  name: '卡片',
  component: Card,
  icon: 'card',
  type: 'layout',
  order: 1,
  isWrapper: true,

  initialValues: {
    component: 'Card',
    children: [],
    props: {
      header: '卡片'
    }
  },
  attr: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '卡片标题', component: 'Input', name: 'props.header' }
  ]
}
