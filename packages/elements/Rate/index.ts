import attrSchema from './attrSchema'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'

export default {
  name: '评分',
  component: 'ElRate',
  icon: h(Icon, { name: 'rate' }),
  type: 'basic',
  order: 12,
  attrSchema,
  initialValues: {
    label: '评分',
    component: 'Rate'
  }
} satisfies FormElement
