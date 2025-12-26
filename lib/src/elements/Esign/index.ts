import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '电子签名',
  component: 'Esign',
  render: Component,
  icon: 'esign',
  type: 'high',
  order: 19,
  attrSchema
} satisfies FormElement
