import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'

export default {
  title: '自增容器',
  component: 'FormList',
  render: FormList,
  icon: 'formList',
  type: 'basic',
  order: 20,
  attrSchema
} satisfies FormElement
