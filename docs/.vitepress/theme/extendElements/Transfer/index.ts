import type { FormElement } from '@form-magic/element-plus'
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
