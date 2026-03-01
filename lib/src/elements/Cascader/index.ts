import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Cascader from './Cascader.vue'

export default {
  title: '级联选择器',
  icon: 'cascader',
  type: 'basic',
  component: 'Cascader',
  attrSchema,
  order: 7,
  render: Cascader
} satisfies FormElement
