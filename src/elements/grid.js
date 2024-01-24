export default {
  name: '栅格布局',
  initialValues: {
    component: 'grid',
    children: [],
    props: {
      colCount: 2,
      space: 20
    }
  },
  attr: [
    { label: '字段标识', component: 'Input', name: 'name' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '列数', component: 'InputNumber', name: 'colCount', initialValue: 2 },
        { label: '间距', component: 'InputNumber', name: 'space', props: { unit: 'px' } }
      ]
    }
  ]
}
