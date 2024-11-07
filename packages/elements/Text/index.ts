import { h } from 'vue'
import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/types'
import component from './Component.vue'

export default {
  name: '文本',
  component,
  icon: h(Icon, { name: 'text' }),
  type: 'assist',
  order: 1,
  attrSchema,
  initialValues: {
    label:"文本",
    component: 'Text',
    props: {
      text: '这是一段文本',
    }
  },
  
} satisfies FormElement
