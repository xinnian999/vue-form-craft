import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/config/commonType'
import component from './Component.vue'

export default {
  name: '选择+输入',
  component,
  icon: h(IconRender, { name: 'input' }),
  type: 'highBasic',
  order: 1,
  initialValues: {
    label: '选择框+输入框',
    component: 'SelectInput',
    props: {
      placeholder: '请输入文本',
      selectPosition: 'append',
      selectWidth: 70
    }
  },
  attrSchema
} satisfies FormElement
