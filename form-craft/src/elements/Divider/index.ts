import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Divider from './Divider.vue'

export default {
  title: '分割线',
  component: 'Divider',
  render: Divider,
  icon: 'divider',
  type: 'assist',
  order: 6,
  attrSchema
} satisfies FormElement
