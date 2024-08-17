import { ElAlert } from 'element-plus'
import { h } from 'vue'
import IconRender from '@/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { formElement } from '@/config/commonType'

export default {
  name: '提示框',
  component: h(ElAlert),
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
    }
  }
} as formElement
