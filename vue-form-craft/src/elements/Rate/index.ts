import { h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '评分',
  component: 'Rate',
  render: 'ElRate',
  icon: h(Icon, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
