import { IconRender } from '@vue-form-craft/components'
import attrSchema from './attrSchema'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/config/commonType'
import component from "./Component.vue";

export default {
  name: '开关',
  component,
  icon: h(IconRender, { name: 'switch' }),
  type: 'basic',
  order: 8,
  attrSchema,
  initialValues: { label: '开关', component: 'Switch', props: { 'inline-prompt': false } },
} satisfies FormElement
