import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '折叠面板-子面板',
  component: 'CollapseItem',
  render: defineAsyncComponent(() => import('./CollapseItem.vue')),
  icon: h(Icon, { name: 'collapse' }),
  type: 'layout',
  order: 10002,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {},
    items: [
      { label: '标题', component: 'Input', name: 'label' },
      { label: '唯一标识', component: 'Input', name: 'name' }
    ]
  }
} satisfies FormElement
