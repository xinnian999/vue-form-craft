import { Icon } from '@magic-form/core'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@magic-form/core'
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
