import { defineAsyncComponent, h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'
// import Input from './Input.vue'

export default {
  title: '单行文本',
  component: 'Input',
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 1,
  // initialValues: {
  //   label: '单行文本',
  //   component: 'Input',
  //   props: {
  //     placeholder: '请输入文本'
  //   }
  // },
  attrSchema,
  render: defineAsyncComponent(() => import('./Input.vue'))
} satisfies FormElement
