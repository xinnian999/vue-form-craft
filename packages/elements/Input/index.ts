import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'
import component from "./Component.vue";

export default {
  name: '单行文本',
  component,
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 1,
  initialValues: {
    label: '单行文本',
    component: 'Input',
    props: {
      placeholder: '请输入文本'
    }
  },
  attrSchema
} satisfies FormElement
