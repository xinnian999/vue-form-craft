import { defineAsyncComponent, h } from 'vue'
import Icon from '@/icons'
import type { FormElement } from '@/types/index'
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
