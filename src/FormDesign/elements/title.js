export default {
  name: '标题',
  initialValues: {
    component: 'title',
    hideLabel: true,
    props: {
      title: '标题',
      type: 'h3'
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
        { label: '标题内容', component: 'input', name: 'title' },
        {
          label: '类型',
          component: 'radio',
          name: 'type',
          props: {
            mode: 'static',
            options: [
              { label: '一级标题', value: 'h1' },
              { label: '二级标题', value: 'h2' },
              { label: '三级标题', value: 'h3' },
              { label: '四级标题', value: 'h4' },
              { label: '五级标题', value: 'h5' }
            ]
          }
        }
      ]
    }
  ]
}
