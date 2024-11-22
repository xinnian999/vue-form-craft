import type { FormElement } from 'vue-form-craft'
import component from './Component.vue'
import icon from './Icon.vue'
import attrSchema from './attrSchema'

export default {
  title: 'markdown',
  component: 'Markdown',
  render: component,
  icon,
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
