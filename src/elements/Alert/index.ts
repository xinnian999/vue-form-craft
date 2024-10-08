import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/config/commonType'

export default {
  name: '提示框',
  component: 'ElAlert',
  icon: h(IconRender, { name: 'alert' }),
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
