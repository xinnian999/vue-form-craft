import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'
import component from './Component.vue'

export default {
  name: '选择+输入',
  component,
  icon: h(Icon, { name: 'input' }),
  type: 'high',
  order: 1,
  initialValues: {
    label: '选择框+输入框',
    component: 'SelectInput',
    props: {
      placeholder: '请输入文本',
      selectPosition: 'append',
      selectWidth: 70
    }
  },
  attrSchema
} satisfies FormElement
