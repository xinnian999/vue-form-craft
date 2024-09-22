import { IconRender } from '@/components'
import type { FormElement } from '@/config/commonType'
import { h } from 'vue'
import Radio from './Radio.vue'
import attrSchema from './attrSchema'

export default {
  name: '单选框组',
  icon: h(IconRender, { name: 'radio' }),
  type: 'basic',
  component: Radio,
  order: 3.5,
  attrSchema,
  initialValues: {
    label: '单选框组',
    component: 'Radio',
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
  }
} satisfies FormElement
