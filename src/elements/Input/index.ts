import { ElInput } from 'element-plus'
import { h } from 'vue'
import IconRender from '@/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { formElement } from '@/config/commonType'

export default {
  name: '单行文本',
  component: h(ElInput, { showWordLimit: true, autocomplete: 'off' }),
  icon: h(IconRender, { name: 'input' }),
  type: 'basic',
  order: 1,
  initialValues: {
    label: '单行文本',
    component: 'Input',
    props: {
      placeholder: '请输入文本'
    }
  },
  attrSchema
} as formElement
