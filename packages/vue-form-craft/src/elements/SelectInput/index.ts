import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import attrSchema from './attrSchema'

export default {
  title: '选择+输入',
  component: 'SelectInput',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'input' }),
  type: 'high',
  order: 1,
  attrSchema
} satisfies FormElement
