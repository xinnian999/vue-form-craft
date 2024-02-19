export default [
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏字段', component: 'Switch', name: 'hidden' },
  { label: '标题内容', component: 'Input', name: 'props.title' },
  {
    label: '类型',
    component: 'Radio',
    name: 'props.type',
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
  },
  { label: '字体倾斜', component: 'Switch', name: 'props.italic' }
]
