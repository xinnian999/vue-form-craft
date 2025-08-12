import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: 'JSON编辑',
  component: 'JsonEdit',
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  render: defineAsyncComponent(() => import('./JsonEdit.vue'))
} satisfies FormElement
