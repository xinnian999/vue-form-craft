import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'

export default {
  title: '自定义组件',
  component: 'Custom',
  render: defineAsyncComponent(() => import('./Custom.vue')),
  icon: h(Icon, { name: 'custom' }),
  type: 'high',
  order: 99,
  attrSchema
} satisfies FormElement
