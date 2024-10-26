import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/config/commonType'
import component from "./Component.vue";

export default {
  name: '单行文本',
  component,
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
} satisfies FormElement
