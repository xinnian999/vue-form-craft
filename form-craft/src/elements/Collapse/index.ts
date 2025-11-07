import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '折叠面板',
  component: 'Collapse',
  render: defineAsyncComponent(() => import('./Collapse.vue')),
  icon: h(Icon, { name: 'collapse' }),
  type: 'layout',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      children: [
        {
          label: '面板1',
          name: 'name1',
          component: 'CollapseItem',
          props: { checked: true },
          children: [],
          designKey: 'name1'
        },
        {
          label: '面板2',
          name: 'name2',
          component: 'CollapseItem',
          children: [],
          designKey: 'name2'
        }
      ]
    },
    items: [{ label: '唯一标识', component: 'Input', name: 'name' }]
  }
} satisfies FormElement
