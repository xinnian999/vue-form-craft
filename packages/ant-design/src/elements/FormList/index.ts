import type { FormElement } from '@form-magic/core'
import attrSchema from './attrSchema'
import { Icon } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: '自增容器',
  component: 'FormList',
  render:defineAsyncComponent(() => import('./FormList.vue')),
  icon: h(Icon, { name: 'formList' }),
  type: 'high',
  order: 20,
  attrSchema
} satisfies FormElement
