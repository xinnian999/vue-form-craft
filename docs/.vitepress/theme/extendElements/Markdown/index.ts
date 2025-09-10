import type { FormElement } from 'vue-form-craft'
import render from './Render.vue'
import icon from './Icon.vue'
import attrSchema from './attrSchema'

export default {
  title: 'markdown',
  component: 'Markdown',
  render,
  icon,
  type: 'basic',
  order: 11,
  attrSchema
} satisfies FormElement
