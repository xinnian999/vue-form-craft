import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    componentProps: {
      text: '这是一段文本'
    }
  },
  items: [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' },
    { label: '文本内容', component: 'Input', name: 'componentProps.text' }
  ]
} satisfies FormSchema
