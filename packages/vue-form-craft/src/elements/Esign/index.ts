import { Icon } from '@/components'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '电子签名',
  component: 'Esign',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'esign' }),
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
