import type { FormSchema } from '@/types/index'

export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '隐藏字段', component: 'Switch', name: 'hidden' },
    { label: '隐藏标签', component: 'Switch', name: 'hideLabel', initialValue: true },
    { label: '标题', component: 'Input', name: 'props.title', initialValue: '提示信息' },
    {
      label: '描述',
      component: 'TextArea',
      name: 'props.description',
      initialValue: '这是一个描述'
    },
    { label: '是否可关闭', component: 'Switch', name: 'props.closable', initialValue: true },
    { label: '显示图标', component: 'Switch', name: 'props.show-icon', initialValue: true },
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
      },
      initialValue: 'info'
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
      },
      initialValue: 'light'
    }
  ]
} satisfies FormSchema
