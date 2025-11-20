import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

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
    initialValues: {
      props: {
        header: '卡片'
      },
      children: []
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '卡片标题', component: 'Input', name: 'props.header' }
    ]
  }
} satisfies FormElement
