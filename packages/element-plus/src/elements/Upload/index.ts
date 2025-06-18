import { Icon } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@form-magic/core'
import attrSchema from './attrSchema'

export default {
  title: '上传',
  component: 'Upload',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'upload' }),
  type: 'basic',
  order: 10,
  attrSchema
} satisfies FormElement
