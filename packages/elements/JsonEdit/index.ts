import type { FormElement } from '@vue-form-craft/types'
import JsonEdit from './JsonEdit.vue'
import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'

export default {
  name: 'JSON编辑',
  component: JsonEdit,
  icon: h(Icon, { name: 'jsonEdit' }),
  type: 'basic',
  order: 14,
  attrSchema,
  initialValues: { label: 'JSON编辑器', component: 'JsonEdit', props: {} }
} satisfies FormElement
