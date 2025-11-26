import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '文本',
  component: 'Text',
  render: Component,
  icon: 'text',
  type: 'assist',
  order: 1,
  attrSchema
} satisfies FormElement
