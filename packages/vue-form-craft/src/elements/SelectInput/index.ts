import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '选择+输入',
  component: 'SelectInput',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'input' }),
  type: 'high',
  order: 1,
  attrSchema
} satisfies FormElement
