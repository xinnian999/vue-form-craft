import { IconRender } from '@vue-form-craft/components'
import attrSchema from './attrSchema'
import Checkbox from './Checkbox.vue'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/release'

export default {
  name: '多选框组',
  icon: h(IconRender, { name: 'checkbox' }),
  type: 'basic',
  component: Checkbox,
  order: 4,
  attrSchema,
  initialValues: {
    label: '多选框组',
    component: 'Checkbox',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      labelKey: 'label',
      valueKey: 'value',
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
    }
  },
} satisfies FormElement
