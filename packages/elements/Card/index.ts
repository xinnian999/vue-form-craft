import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import Card from './Card.vue'
import type { FormElement } from '@vue-form-craft/config/commonType'

export default {
  name: '卡片',
  component: Card,
  icon: h(IconRender, { name: 'card' }),
  type: 'layout',
  order: 1,
  initialValues: {
    component: 'Card',
    children: [],
    props: {
      header: '卡片'
    }
  },
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '卡片标题', component: 'Input', name: 'props.header' }
    ]
  }
} satisfies FormElement
