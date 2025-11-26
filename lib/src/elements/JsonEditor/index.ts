import JsonEditor from '@/components/JsonEditor.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: 'JSON编辑',
  component: 'JsonEditor',
  icon: 'jsonEdit',
  type: 'basic',
  order: 14,
  attrSchema,
  render: JsonEditor
} satisfies FormElement
