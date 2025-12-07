import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '上传',
  component: 'Upload',
  render: Component,
  icon: 'upload',
  type: 'basic',
  order: 12.5,
  attrSchema
} satisfies FormElement
