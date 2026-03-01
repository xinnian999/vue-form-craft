import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '颜色选择器',
  component: 'ColorPicker',
  render: Component,
  icon: 'colorPicker',
  type: 'basic',
  order: 9,
  attrSchema
} satisfies FormElement
