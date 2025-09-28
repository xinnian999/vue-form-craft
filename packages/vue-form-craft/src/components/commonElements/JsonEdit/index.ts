import { Icon } from '@/components'
import { h } from 'vue'
import type { FormElement } from '@/types'
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
