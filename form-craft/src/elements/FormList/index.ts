import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '自增容器',
  component: 'FormList',
  render: defineAsyncComponent(() => import('./FormList.vue')),
  icon: h(Icon, { name: 'formList' }),
  type: 'high',
  order: 20,
  attrSchema
} satisfies FormElement
