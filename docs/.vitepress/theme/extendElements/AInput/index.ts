import type { FormElement } from 'vue-form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'
import { Input } from "@arco-design/web-vue";

export default {
  name: 'Arco Input',
  component: Input,
  icon,
  type: 'basic',
  order: 1.1,
  initialValues: {
    label: '单行文本',
    component: 'AInput',
    props: {
      placeholder: '请输入文本'
    }
  },
  attrSchema
} satisfies FormElement
