import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '函数编辑器',
  component: 'FunctionEditor',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'code' }),
  type: 'basic',
  order: 100,
  attrSchema: {
    labelWidth: 110,
    size: 'small',
    items: []
  }
} satisfies FormElement
