import type { FormElement } from 'vue-form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'
import { Input } from '@arco-design/web-vue'

export default {
  title: 'Arco Input',
  component: 'AInput',
  render: Input,
  icon,
  type: 'basic',
  order: 1.1,
  attrSchema
} satisfies FormElement
