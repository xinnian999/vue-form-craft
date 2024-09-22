import type { FormElement } from '@/release'
import JsonEdit from './JsonEdit.vue'
import attrSchema from './attrSchema'
import { IconRender } from '@/components'
import { h } from 'vue'

export default {
  name: 'JSON编辑',
  component: JsonEdit,
  icon: h(IconRender, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  initialValues: { label: 'JSON编辑器', component: 'JsonEdit', props: {} }
} satisfies FormElement
