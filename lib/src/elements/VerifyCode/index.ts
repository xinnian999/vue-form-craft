import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Component from './Component.vue'

export default {
  title: '图形验证码',
  component: 'VerifyCode',
  render: Component,
  icon: 'verifyCode',
  type: 'basic',
  order: 18,
  attrSchema
} satisfies FormElement
