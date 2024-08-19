import { IconRender } from '@/components'
import { h } from 'vue'
import { ElInput } from 'element-plus'
import type { FormElement } from '@/config/commonType'
import attrSchema from './attrSchema'

export default {
  name: '多行文本',
  component: h(ElInput, { type: 'textarea', showWordLimit: true, autocomplete: 'off' }),
  icon: h(IconRender, { name: 'textarea' }),
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
} as FormElement
