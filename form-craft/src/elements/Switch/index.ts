import type { FormElement } from '@/types'
import Component from './Component.vue'
import attrSchema from './switchAttrSchema'

export default {
  title: '开关',
  render: Component,
  component: 'Switch',
  icon: 'switch',
  type: 'basic',
  order: 8,
  attrSchema
} satisfies FormElement
