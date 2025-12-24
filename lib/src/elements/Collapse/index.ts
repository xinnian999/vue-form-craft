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
          children: []
      },
        {
          label: '面板2',
          name: 'name2',
          component: 'CollapseItem',
          children: []
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
            name: 'label'
          },
          {
            label: '唯一标识',
            component: 'Input',
            props: {
              placeholder: '请输入唯一标识'
            },
            name: 'name'
          },
          {
            label: '默认展开',
            component: 'Switch',
            name: 'props.checked'
          }
        ],
        props: {
          mode: 'card',
          title: '折叠面板',
          getNewItem:
            '{{ (index) => { return { label: "面板" + index, name: "name" + index, props: { checked: false } } } }}'
        },
        name: 'children'
      }
    ]
  }
} satisfies FormElement
