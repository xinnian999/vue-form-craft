export default [
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      { label: '列数', component: 'InputNumber', name: 'colCount', initialValue: 2 },
      { label: '间距', component: 'InputNumber', name: 'space', props: { unit: 'px' } }
    ]
  }
]
