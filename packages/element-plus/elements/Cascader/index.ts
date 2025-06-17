import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@form-magic/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@/types/index'

export default {
  title: '级联选择器',
  icon: h(Icon, { name: 'cascader' }),
  type: 'basic',
  component: 'Cascader',
  attrSchema,
  order: 7,
  render: defineAsyncComponent(() => import('./Cascader.vue'))
} satisfies FormElement