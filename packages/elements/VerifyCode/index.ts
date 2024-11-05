import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '图形验证码',
  component,
  icon: h(Icon, { name: 'textarea' }),
  type: 'basic',
  order: 18,
  attrSchema,
  initialValues: {
    label: '验证码',
    component: 'VerifyCode',
    required: true,
    props: {
      placeholder: '请输入验证码'
    }
  }
} satisfies FormElement
