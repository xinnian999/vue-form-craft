import Icon from '@vue-form-craft/icons'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
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
