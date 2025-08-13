import { Icon } from '@magic-form/core'
import type { FormElement } from '@magic-form/core'
import { defineAsyncComponent, h } from 'vue'
import attrSchema from './attrSchema'

export default {
  title: '单选框组',
  icon: h(Icon, { name: 'radio' }),
  type: 'basic',
  component: 'Radio',
  render: defineAsyncComponent(() => import('./Radio.vue')),
  order: 3.5,
  attrSchema
} satisfies FormElement
