import type { FormElement } from '@form-magic/core'
import { defineAsyncComponent, h } from 'vue'
import { Icon } from '@form-magic/core'

export default {
  title: '折叠面板',
  component: 'Collapse',
  render: defineAsyncComponent(() => import('./Collapse.vue')),
  icon: h(Icon, { name: 'collapse' }),
  type: 'layout',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      children: [{ title: '面板1', name: 'name1', children: [] }] as any
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '子面板设置',
        component: 'FormList',
        children: [
          {
            label: '标题',
            component: 'Input',
            props: {
              placeholder: '请输入标题'
            },
            designKey: 'id-l8cI',
            name: 'title',
            initialValue: '{{ "面板" + ($index + 1) }}'
          },
          {
            label: '唯一标识',
            component: 'Input',
            props: {
              placeholder: '请输入唯一标识'
            },
            designKey: 'form-YE6U',
            name: 'name',
            initialValue: '{{ "name" + ($index + 1) }}'
          },
          {
            label: '默认展开',
            component: 'Switch',
            designKey: 'form-YE6U',
            name: 'checked'
          }
        ],
        props: {
          mode: 'card',
          title: '面板'
        },
        designKey: 'id-RQ1a',
        name: 'children'
      }
    ]
  }
} satisfies FormElement
