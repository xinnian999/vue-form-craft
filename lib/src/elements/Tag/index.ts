import type { FormElement } from '@/types'
import Tag from './Tag.vue'

export default {
  title: '标签',
  component: 'Tag',
  render: Tag,
  icon: 'tag',
  type: 'assist',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      componentProps: {
        text: 'Tag',
        type: 'primary'
      }
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' },
      { label: '内容', component: 'Input', name: 'componentProps.text' },
      {
        label: '类型',
        component: 'Radio',
        name: 'componentProps.type',
        componentProps: {
          mode: 'static',
          options: [
            { label: '主题色', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '信息', value: 'info' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' }
          ]
        }
      }
    ]
  }
} satisfies FormElement
