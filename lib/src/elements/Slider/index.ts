import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '滑块',
  render: Component,
  component: 'Slider',
  icon: 'slider',
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
