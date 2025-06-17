import type { FormElement } from '@/types/index'
import Icon from '@/icons'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: '标签',
  component: 'Tag',
  render: defineAsyncComponent(() => import('./Tag.vue')),
  icon: h(Icon, { name: 'tag' }),
  type: 'assist',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        text: 'Tag',
        type: 'primary'
      },
      hideLabel: true
    },
    items: [
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
            { label: '危险', value: 'danger' }
          ]
        }
      }
    ]
  }
} satisfies FormElement
