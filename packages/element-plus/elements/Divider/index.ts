import type { FormElement } from '@/types/index'
import attrSchema from './attrSchema'
import { Icon } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: '分割线',
  component: 'Divider',
  render:defineAsyncComponent(() => import('./Divider.vue')),
  icon: h(Icon, { name: 'divider' }),
  type: 'assist',
  order: 6,
  attrSchema
} satisfies FormElement
