import type { FormElement } from '@/types'
import Collapse from './Collapse.vue'

export default {
  title: '折叠面板',
  component: 'Collapse',
  render: Collapse,
  icon: 'collapse',
  type: 'layout',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      children: [
        {
          label: '面板1',
          name: 'name1',
          component: 'CollapseItem',
          props: { checked: true },
          children: [],
          designKey: 'name1'
        },
        {
          label: '面板2',
          name: 'name2',
          component: 'CollapseItem',
          children: [],
          designKey: 'name2'
        }
      ]
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '子面板配置',
        component: 'FormList',
        children: [
          {
            label: '标题',
            component: 'Input',
            props: {
              placeholder: '请输入标题'
            },
            name: 'label',
            initialValue: '{{ "面板" + ($index + 1) }}'
          },
          {
            label: '唯一标识',
            component: 'Input',
            props: {
              placeholder: '请输入唯一标识'
            },
            name: 'name',
            initialValue: '{{ "name" + ($index + 1) }}'
          },
          {
            label: '默认展开',
            component: 'Switch',
            name: 'props.checked'
          }
        ],
        props: {
          mode: 'card',
          title: '折叠面板'
        },
        name: 'children'
      }
    ]
  }
} satisfies FormElement
