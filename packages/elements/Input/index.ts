import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
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
