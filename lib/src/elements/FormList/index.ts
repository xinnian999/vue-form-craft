import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'

export default {
  title: '自增容器',
  component: 'FormList',
  render: FormList,
  icon: 'formList',
  type: 'high',
  order: 1,
  attrSchema
} satisfies FormElement
