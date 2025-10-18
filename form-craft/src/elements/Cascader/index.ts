import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '级联选择器',
  icon: h(Icon, { name: 'cascader' }),
  type: 'basic',
  component: 'Cascader',
  attrSchema,
  order: 7,
  render: defineAsyncComponent(() => import('./Cascader.vue'))
} satisfies FormElement
