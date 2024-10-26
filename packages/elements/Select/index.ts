import type { FormElement } from '@vue-form-craft/config/commonType'
import Select from './Select.vue'
import attrSchema from './attrSchema'
import { h } from 'vue'
import { IconRender } from '@vue-form-craft/components'

export default {
  name: '下拉选择框',
  type: 'basic',
  icon: h(IconRender, { name: 'select' }),
  component: Select,
  order: 3,
  attrSchema,
  initialValues: {
    label: '下拉选择框',
    component: 'Select',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      placeholder: '请选择...'
    }
  }
} satisfies FormElement
