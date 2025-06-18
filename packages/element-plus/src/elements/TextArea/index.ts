import { Icon } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@form-magic/core'
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
