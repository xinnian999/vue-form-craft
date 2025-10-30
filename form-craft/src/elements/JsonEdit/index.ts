import { h } from 'vue'
import { JsonEditor } from '@/components'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: 'JSON编辑',
  component: 'JsonEditor',
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  render: JsonEditor
} satisfies FormElement
