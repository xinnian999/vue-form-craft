import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@form-magic/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@form-magic/core'

export default {
  title: '选择+输入',
  component: 'SelectInput',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'input' }),
  type: 'high',
  order: 1,
  attrSchema
} satisfies FormElement
