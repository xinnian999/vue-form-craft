export default [
  { label: '唯一标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  { label: '标题', component: 'Input', name: 'props.title' },
  {
    label: '标题位置',
    component: 'Radio',
    name: 'props.contentPosition',
    props: {
      mode: 'static',
      options: [
        {
          label: '靠左',
          value: 'left'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '靠右',
          value: 'right'
        }
      ]
    },
    initialValue: 'center',
    designKey: 'form-PLpj'
  }
]
