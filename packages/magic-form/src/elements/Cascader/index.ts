import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@magic-form/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@magic-form/core'

export default {
  title: '级联选择器',
  icon: h(Icon, { name: 'cascader' }),
  type: 'basic',
  component: 'Cascader',
  attrSchema,
  order: 7,
  render: defineAsyncComponent(() => import('./Cascader.vue'))
} satisfies FormElement