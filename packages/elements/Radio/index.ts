import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import { defineAsyncComponent, h } from 'vue'
import attrSchema from './attrSchema'

export default {
  title: '单选框组',
  icon: h(Icon, { name: 'radio' }),
  type: 'basic',
  component: 'Radio',
  render: defineAsyncComponent(() => import('./Radio.vue')),
  order: 3.5,
  attrSchema
} satisfies FormElement
