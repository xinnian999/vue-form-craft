import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '评分',
  component: 'Rate',
  render: Component,
  icon: 'rate',
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
