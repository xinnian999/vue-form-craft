import type { FormElement } from '@/release'
import Tag from './Tag.vue'
import { IconRender } from '@/components'
import { h } from 'vue'

export default {
  name: '标签',
  component: Tag,
  icon: h(IconRender, { name: 'tag' }),
  type: 'assist',
  order: 4,
  initialValues: {
    component: 'Tag',
    props: {
      text: 'Tag',
      type: 'primary'
    },
    hideLabel:true
  },
  attrSchema:{
    size: 'small',
    labelAlign: 'top',
    items:[
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '隐藏字段', component: 'Switch', name: 'hidden' },
      { label: '隐藏标签', component: 'Switch', name: 'hideLabel' },
      { label: '内容', component: 'Input', name: 'props.text' },
      {
        label: '类型',
        component: 'Radio',
        name: 'props.type',
        props: {
          mode: 'static',
          options: [
            { label: '主题色', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '信息', value: 'info' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
          ]
        }
      },
    ]}
} satisfies FormElement
