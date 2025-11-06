import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '选项卡面板',
  component: 'TabPane',
  render: defineAsyncComponent(() => import('./TabPane.vue')),
  icon: h(Icon, { name: 'tabs' }),
  type: 'layout',
  order: 10001,
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
