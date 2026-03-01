import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '开关',
  render: Component,
  component: 'Switch',
  icon: 'switch',
  type: 'basic',
  order: 8,
  attrSchema
} satisfies FormElement
