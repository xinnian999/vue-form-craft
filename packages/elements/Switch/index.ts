import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '开关',
  render: defineAsyncComponent(() => import('./Component.vue')),
  component: 'Switch',
  icon: h(Icon, { name: 'switch' }),
  type: 'basic',
  order: 8,
  attrSchema
} satisfies FormElement
