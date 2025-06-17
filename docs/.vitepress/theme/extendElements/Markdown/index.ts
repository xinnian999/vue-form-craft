import type { FormElement } from '@form-magic/element-plus'
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
