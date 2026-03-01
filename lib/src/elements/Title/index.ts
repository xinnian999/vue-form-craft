import type { FormElement } from '@/types'
import Title from './Title.vue'

export default {
  title: '标题',
  component: 'Title',
  render: Title,
  icon: 'title',
  type: 'assist',
  order: 3,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      componentProps: {
        title: '标题',
        type: 'h3'
      }
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' },
      { label: '标题内容', component: 'Input', name: 'componentProps.title' },
      {
        label: '类型',
        component: 'Radio',
        name: 'componentProps.type',
        componentProps: {
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
      { label: '字体倾斜', component: 'Switch', name: 'componentProps.italic' }
    ]
  }
} satisfies FormElement
