import type { FormElement } from 'vue-form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '穿梭框',
  component,
  icon,
  type: 'basic',
  order: 12,
  initialValues: {
    label: '穿梭框',
    component: 'Transfer',
    props: {
      data: [
        { label: '选项一', key: 'value1' },
        { label: '选项二', key: 'value2' },
        { label: '选项三', key: 'value3' }
      ]
    }
  },
  attrSchema
} satisfies FormElement
