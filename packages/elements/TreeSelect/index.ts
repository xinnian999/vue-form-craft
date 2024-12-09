import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '树型选择',
  icon: h(Icon, { name: 'tree' }),
  type: 'basic',
  component: 'TreeSelect',
  attrSchema,
  order: 8.5,
  render: defineAsyncComponent(() => import('./TreeSelect.vue'))
} satisfies FormElement