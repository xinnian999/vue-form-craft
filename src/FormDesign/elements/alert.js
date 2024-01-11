export default {
  name: '提示框',
  initialValues: {
    component: 'alert',
    hideLabel: true,
    props: {
      title: '提示信息',
      type: 'info',
      effect: 'light',
      description: '这是一个描述',
      closable: true
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
        { label: '标题', component: 'input', name: 'title' },
        { label: '描述', component: 'textarea', name: 'description' },
        { label: '是否可关闭', component: 'switch', name: 'closable' },
        {
          label: '类型',
          component: 'radio',
          name: 'type',
          props: {
            mode: 'static',
            options: [
              { label: '成功', value: 'success' },
              { label: '信息', value: 'info' },
              { label: '警告', value: 'warning' },
              { label: '错误', value: 'error' }
            ]
          }
        },
        {
          label: '主题',
          component: 'radio',
          name: 'effect',
          props: {
            mode: 'static',
            options: [
              { label: '浅色', value: 'light' },
              { label: '深色', value: 'dark' }
            ]
          }
        }
      ]
    }
  ]
}
