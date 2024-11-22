import Icon from '@vue-form-craft/icons'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'

export default {
  title: '图形验证码',
  component: 'VerifyCode',
  render:defineAsyncComponent(()=>import('./Component.vue')),
  icon: h(Icon, { name: 'verifyCode' }),
  type: 'high',
  order: 18,
  attrSchema
} satisfies FormElement
