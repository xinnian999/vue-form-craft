import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/core'
import { Icon } from '@vue-form-craft/core'
import attrSchema from './attrSchema'
import JsonEdit from './JsonEdit.vue'

export default {
  title: 'JSON编辑',
  component: 'JsonEdit',
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  render: JsonEdit
} satisfies FormElement
