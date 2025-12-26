import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    props: {
      title: '分割线'
    }
  },
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' },
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
      defaultValue: 'center'
    }
  ]
} satisfies FormSchema
