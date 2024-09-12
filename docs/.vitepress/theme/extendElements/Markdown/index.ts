import type { FormElement } from 'vue-form-craft'
import component from './Component.vue'
import icon from './Icon.vue'
import attrSchema from './attrSchema'

export default {
  name: 'markdown',
  component,
  icon,
  type: 'basic',
  order: 11,
  initialValues: { label: 'markdown编辑器', component: 'Markdown' },
  attrSchema
} satisfies FormElement