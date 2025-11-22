import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '滑块',
  render: 'ElSlider',
  component: 'Slider',
  icon: 'slider',
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
