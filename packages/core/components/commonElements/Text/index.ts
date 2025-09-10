import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@vue-form-craft/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/core'

export default {
  title: '文本',
  component: 'Text',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'text' }),
  type: 'assist',
  order: 1,
  attrSchema
} satisfies FormElement
