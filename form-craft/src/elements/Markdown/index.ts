import type { FormElement } from 'form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'
import { Markdown } from '@/components'

export default {
  title: 'Markdown',
  component: 'Markdown',
  render: Markdown,
  icon,
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
