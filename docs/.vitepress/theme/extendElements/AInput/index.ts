import type { FormElement } from '@form-magic/element-plus'
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
