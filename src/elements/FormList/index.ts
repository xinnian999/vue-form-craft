import type { FormElement } from '@/release'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'
import { IconRender } from '@/components'
import { h } from 'vue'

export default {
  name: '自增容器',
  component: FormList,
  icon: h(IconRender, { name: 'formList' }),
  type: 'high',
  order: 1,
  initialValues: {
    label: '自增容器',
    component: 'FormList',
    children: [],
    props: {
      mode: 'table'
    }
  },
  attrSchema
} as FormElement
