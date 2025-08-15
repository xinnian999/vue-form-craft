import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@form-magic/core'
import type { FormElement } from '@form-magic/core'
import attrSchema from './attrSchema'

export default {
  title: '颜色输入框',
  component: 'ColorInput',
  render: defineAsyncComponent(() => import('./ColorInput.vue')),
  icon: h(Icon, { name: 'colorPicker' }),
  type: 'high',
  order: 2,
  attrSchema
} satisfies FormElement
