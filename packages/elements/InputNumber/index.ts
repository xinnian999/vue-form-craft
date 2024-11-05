import Icon from '@vue-form-craft/icons'
import attrSchema from './attrSchema'
import { h } from 'vue'
import type { FormElement } from '@vue-form-craft/types'
import component from "./Component.vue";


export default {
  name: '计数器',
  icon: h(Icon, { name: 'inputNumber' }),
  type: 'basic',
  order: 5,
  component,
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
