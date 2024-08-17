export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    { label: '标题', component: 'Input', name: 'props.title' },
    { label: '描述', component: 'Textarea', name: 'props.description' },
    { label: '是否可关闭', component: 'Switch', name: 'props.closable' },
    { label: '显示图标', component: 'Switch', name: 'props.show-icon' },
    {
      label: '类型',
      component: 'Radio',
      name: 'props.type',
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
      component: 'Radio',
      name: 'props.effect',
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
