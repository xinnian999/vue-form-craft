import { h } from 'vue'
import { Icon } from '@magic-form/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@magic-form/core'

export default {
  title: '提示框',
  component: 'Alert',
  icon: h(Icon, { name: 'alert' }),
  type: 'assist',
  order: 2,
  attrSchema,
  render: 'ElAlert'
} satisfies FormElement
