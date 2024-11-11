import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'

export default {
  title: '电子签名',
  component: 'Esign',
  render:defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'esign' }),
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
