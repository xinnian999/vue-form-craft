export default {
  name: '行内布局',
  initialValues: {
    component: 'inline',
    children: [],
    props: {
      align: 'left',
      margin: 20
    }
  },
  attr: [
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '隐藏字段', component: 'switch', name: 'hidden' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        {
          label: '对齐方式',
          component: 'radio',
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
        { label: '间距大小', component: 'inputNumber', name: 'margin', props: { unit: 'px' } },
        { label: '自动换行', component: 'switch', name: 'autoWrap' }
      ]
    }
  ]
}
