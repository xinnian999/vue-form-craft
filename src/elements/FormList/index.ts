import type { FormElement } from '@/release'
import attrSchema from './attrSchema'
import FormList from './FormList.vue'
import { IconRender } from '@/components'
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
