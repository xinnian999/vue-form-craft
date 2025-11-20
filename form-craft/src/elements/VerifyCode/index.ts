import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '图形验证码',
  component: 'VerifyCode',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'verifyCode' }),
  type: 'basic',
  order: 18,
  attrSchema
} satisfies FormElement
