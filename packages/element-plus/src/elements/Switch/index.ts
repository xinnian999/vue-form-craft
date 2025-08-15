import { Icon } from '@form-magic/core'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@form-magic/core'

export default {
  title: '开关',
  render: defineAsyncComponent(() => import('./Component.vue')),
  component: 'Switch',
  icon: h(Icon, { name: 'switch' }),
  type: 'basic',
  order: 8,
  attrSchema
} satisfies FormElement
