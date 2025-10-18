import { h } from 'vue'
import { JsonEdit } from '@/components'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: 'JSON编辑',
  component: 'JsonEdit',
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  render: JsonEdit
} satisfies FormElement
