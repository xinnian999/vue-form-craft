export default [
  { label: '唯一标识', component: 'Input', name: 'name' },
  {
    label: '对齐方式',
    component: 'Radio',
    name: 'props.align',
    props: {
      mode: 'static',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'right' }
      ]
    },
    initialValue: 'left'
  },
  { label: '间距大小', component: 'InputNumber', name: 'props.gap', props: { unit: 'px' } },
  { label: '自动换行', component: 'Switch', name: 'props.autoWrap' }
]
