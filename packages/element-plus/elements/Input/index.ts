import { h } from 'vue'
import Icon from '@/icons'
import type { FormElement } from '@/types/index'
import attrSchema from './attrSchema'
import Input from './Input.vue'

export default {
  title: '单行文本',
  component: 'Input',
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 1,
  attrSchema,
  render: Input
} satisfies FormElement
