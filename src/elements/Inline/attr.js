export default [
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      {
        label: '对齐方式',
        component: 'Radio',
        name: 'align',
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
      { label: '间距大小', component: 'InputNumber', name: 'gap', props: { unit: 'px' } },
      { label: '自动换行', component: 'Switch', name: 'autoWrap' }
    ]
  }
]
