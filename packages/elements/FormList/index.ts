import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'

export default {
  name: '自增容器',
  component: FormList,
  icon: h(Icon, { name: 'formList' }),
  type: 'basic',
  order: 20,
  initialValues: {
    label: '自增容器',
    component: 'FormList',
    children: [],
    props: {
      mode: 'table'
    }
  },
  attrSchema
} satisfies FormElement
