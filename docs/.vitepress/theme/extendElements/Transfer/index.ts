import type { FormElement } from 'vue-form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'
import render from './Render.vue'

export default {
  title: '穿梭框',
  component: 'Transfer',
  render,
  icon,
  type: 'basic',
  order: 12,
  attrSchema
} satisfies FormElement
