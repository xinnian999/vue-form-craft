import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '评分',
  component: 'Rate',
  render: 'ElRate',
  icon: h(Icon, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
