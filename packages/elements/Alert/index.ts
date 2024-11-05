import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'

export default {
  name: '提示框',
  component: 'ElAlert',
  icon: h(Icon, { name: 'alert' }),
  type: 'assist',
  order: 2,
  attrSchema,
  initialValues: {
    component: 'Alert',
    props: {
      title: '提示信息',
      type: 'info',
      effect: 'light',
      description: '这是一个描述',
      closable: true,
      'show-icon': true
    },
    hideLabel:true
  },
  
} satisfies FormElement
