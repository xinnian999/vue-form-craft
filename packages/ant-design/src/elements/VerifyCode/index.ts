import { Icon } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'
import type { FormElement } from '@form-magic/core'
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
