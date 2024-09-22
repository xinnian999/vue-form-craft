import type { FormElement } from '@/release'
import Title from './Title.vue'
import { IconRender } from '@/components'
import { h } from 'vue'

export default {
  name: '标题',
  component: Title,
  icon: h(IconRender, { name: 'title' }),
  type: 'assist',
  order: 3,
  initialValues: {
    component: 'Title',
    props: {
      title: '标题',
      type: 'h3'
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
      { label: '标题内容', component: 'Input', name: 'props.title' },
      {
        label: '类型',
        component: 'Radio',
        name: 'props.type',
        props: {
          mode: 'static',
          options: [
            { label: '一级标题', value: 'h1' },
            { label: '二级标题', value: 'h2' },
            { label: '三级标题', value: 'h3' },
            { label: '四级标题', value: 'h4' },
            { label: '五级标题', value: 'h5' }
          ]
        }
      },
      { label: '字体倾斜', component: 'Switch', name: 'props.italic' }
    ]}
} satisfies FormElement
