import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Custom from './Custom.vue'

export default {
  title: '自定义组件',
  component: 'Custom',
  render: Custom,
  icon: 'custom',
  type: 'basic',
  order: 99,
  attrSchema
} satisfies FormElement
