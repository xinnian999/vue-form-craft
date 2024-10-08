import attrSchema from './attrSchema'
import { IconRender } from '@vue-form-craft/components'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/config/commonType'

export default {
  name: '评分',
  component: 'ElRate',
  icon: h(IconRender, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema,
  initialValues: {
    label: '评分',
    component: 'Rate'
  }
} satisfies FormElement
