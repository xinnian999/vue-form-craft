import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '评分',
  component: 'Rate',
  render: 'ElRate',
  icon: 'rate',
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
