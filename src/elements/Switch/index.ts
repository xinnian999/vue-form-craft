import { IconRender } from '@/components'
import attrSchema from './attrSchema'
import { h } from 'vue'
import type { FormElement } from '@/config/commonType'

export default {
  name: '开关',
  component: 'ElSwitch',
  icon: h(IconRender, { name: 'switch' }),
  type: 'basic',
  order: 8,
  attrSchema,
  initialValues: { label: '开关', component: 'Switch', props: { 'inline-prompt': false } },
} satisfies FormElement
