import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '多行文本',
  component,
  icon: h(Icon, { name: 'textarea' }),
  type: 'basic',
  order: 2,
  attrSchema,
  initialValues: {
    label: '多行文本',
    component: 'Textarea',
    props: {
      autosize: { minRows: 4, maxRows: 999 },
      placeholder: '请输入...'
    }
  }
} satisfies FormElement
