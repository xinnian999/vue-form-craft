export default [
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  {
    label: 'props',
    component: 'ItemGroup',
    name: 'props',
    children: [
      { label: '标题', component: 'Input', name: 'title' },
      { label: '描述', component: 'Textarea', name: 'description' },
      { label: '是否可关闭', component: 'Switch', name: 'closable' },
      { label: '显示图标', component: 'Switch', name: 'show-icon' },
      {
        label: '类型',
        component: 'Radio',
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
        component: 'Radio',
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
