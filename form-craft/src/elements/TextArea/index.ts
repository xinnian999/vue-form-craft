import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '多行文本',
  component: 'TextArea',
  icon: h(Icon, { name: 'textarea' }),
  type: 'basic',
  order: 2,
  attrSchema,
  render: defineAsyncComponent(() => import('./TextArea.vue'))
} satisfies FormElement
