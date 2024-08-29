import { IconRender } from '@/components'
import attrSchema from './attrSchema'
import { h } from 'vue'
import { ElInputNumber } from 'element-plus'
import type { FormElement } from '@/config/commonType'

export default {
  name: '计数器',
  icon: h(IconRender, { name: 'inputNumber' }),
  type: 'basic',
  order: 5,
  component: ElInputNumber,
  attrSchema,
  initialValues: {
    label: '计数器',
    component: 'InputNumber',
    props: {
      min: 1,
      max: 999,
      step: 1,
      controlsPosition:''
    },
  }
} satisfies FormElement
