import attrSchema from './attrSchema'
import Icon from '@/icons'
import { h } from 'vue'
import type { FormElement } from '@/types/index'

export default {
  title: '评分',
  component: 'Rate',
  render: 'ElRate',
  icon: h(Icon, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
