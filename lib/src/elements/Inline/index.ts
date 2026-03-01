import type { FormElement } from '@/types'
import Inline from './Inline.vue'

export default {
  title: '行内布局',
  icon: 'inline',
  type: 'layout',
  component: 'Inline',
  render: Inline,
  order: 2,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      componentProps: {
        align: 'left',
        gap: 20
      },
      items: []
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '对齐方式',
        component: 'Radio',
        name: 'componentProps.align',
        componentProps: {
          mode: 'static',
          options: [
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' }
          ]
        }
      },
      { label: '间距大小', component: 'InputNumber', name: 'componentProps.gap', componentProps: { unit: 'px' } },
      { label: '自动换行', component: 'Switch', name: 'componentProps.autoWrap' }
    ]
  }
} satisfies FormElement
