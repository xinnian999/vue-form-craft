import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '提示框',
  component: 'Alert',
  icon: 'alert',
  type: 'assist',
  order: 2,
  attrSchema,
  render: 'ElAlert'
} satisfies FormElement
