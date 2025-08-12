import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
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
