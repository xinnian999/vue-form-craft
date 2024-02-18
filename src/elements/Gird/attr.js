export default [
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  { label: '列数', component: 'InputNumber', name: 'props.columns', initialValue: 2 },
  { label: '列间距', component: 'InputNumber', name: 'props.column-gap', props: { unit: 'px' } },
  { label: '行间距', component: 'InputNumber', name: 'props.row-gap', props: { unit: 'px' } }
]
