import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    componentProps: {
      type: 'info',
      title: '提示信息',
      description: '这是一个描述',
      closable: true,
      showIcon: true
    }
  },
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' },
    { label: '标题', component: 'Input', name: 'componentProps.title' },
    {
      label: '描述',
      component: 'TextArea',
      name: 'componentProps.description'
    },
    { label: '是否可关闭', component: 'Switch', name: 'componentProps.closable' },
    { label: '显示图标', component: 'Switch', name: 'componentProps.show-icon' },
    {
      label: '类型',
      component: 'Radio',
      name: 'componentProps.type',
      componentProps: {
        mode: 'static',
        options: [
          { label: '成功', value: 'success' },
          { label: '信息', value: 'info' },
          { label: '警告', value: 'warning' },
          { label: '错误', value: 'error' }
        ]
      }
    }
  ]
} satisfies FormSchema
