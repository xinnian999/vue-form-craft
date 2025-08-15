import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@magic-form/core'
import attrSchema from './attrSchema'
import type { FormElement } from '@magic-form/core'

export default {
  title: '电子签名',
  component: 'Esign',
  render:defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'esign' }),
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
