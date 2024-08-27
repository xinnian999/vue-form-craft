import { ElRate } from 'element-plus'
import attrSchema from './attrSchema'
import { IconRender } from '@/components'
import { h } from 'vue'
import type { FormElement } from '@/config/commonType'

export default {
  name: '评分',
  component: ElRate,
  icon: h(IconRender, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema,
  initialValues: {
    label: '评分',
    component: 'Rate'
  }
} as FormElement
