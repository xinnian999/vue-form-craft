import { Icon } from '@/components'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '提示框',
  component: 'Alert',
  icon: h(Icon, { name: 'alert' }),
  type: 'assist',
  order: 2,
  attrSchema,
  render: 'ElAlert'
} satisfies FormElement
