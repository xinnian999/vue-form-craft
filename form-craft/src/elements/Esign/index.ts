import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '电子签名',
  component: 'Esign',
  render: Component,
  icon: 'esign',
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
