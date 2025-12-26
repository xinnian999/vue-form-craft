import type { FormElement } from '@/types'
import Card from './Card.vue'

export default {
  title: '卡片',
  component: 'Card',
  render: Card,
  icon: 'card',
  type: 'layout',
  order: 1,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      componentProps: {
        header: '卡片'
      },
      children: []
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '卡片标题', component: 'Input', name: 'componentProps.header' }
    ]
  }
} satisfies FormElement
