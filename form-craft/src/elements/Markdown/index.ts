import { Markdown } from '@/components'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import icon from './Icon.vue'

export default {
  title: 'Markdown',
  component: 'Markdown',
  render: Markdown,
  icon,
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
