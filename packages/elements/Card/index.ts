import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '卡片',
  component: 'Card',
  render: defineAsyncComponent(() => import('./Card.vue')),
  icon: h(Icon, { name: 'card' }),
  type: 'layout',
  order: 1,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '卡片标题', component: 'Input', name: 'props.header', initialValue: '卡片' }
    ]
  }
} satisfies FormElement
