import Collapse from './Collapse.vue'

export default {
  name: '折叠面板',
  component: Collapse,
  icon: 'card',
  type: 'layout',
  order: 4,
  isWrapper: true,

  initialValues: {
    component: 'Collapse',
    children: [
      { title: '折叠面板1', children: [] },
      { title: '折叠面板2', children: [] }
    ]
  },
  attr: [{ label: '字段标识', component: 'Input', name: 'name' }]
}
