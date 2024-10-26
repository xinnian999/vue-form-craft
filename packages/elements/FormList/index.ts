import type { FormElement } from '@vue-form-craft/release'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'
import { IconRender } from '@vue-form-craft/components'
import { h } from 'vue'

export default {
  name: '自增容器',
  component: FormList,
  icon: h(IconRender, { name: 'formList' }),
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
