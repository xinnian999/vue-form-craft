import type { FormElement } from '@/release'
import Collapse from './Collapse.vue'
import { h } from 'vue'
import IconRender from '@/components/IconRender.vue'

export default {
  name: '折叠面板',
  component: Collapse,
  icon: h(IconRender, { name: 'collapse' }),
  type: 'layout',
  order: 4,
  initialValues: {
    component: 'Collapse',
    children: [{ title: '折叠面板1', name: 'name1', children: [] }]
  },
  attrSchema:{
    size: 'small',
    labelAlign: 'top',
    items:  [
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
          name: 'title'
        },
        {
          label: '唯一标识',
          component: 'Input',
          props: {
            placeholder: '请输入唯一标识'
          },
          designKey: 'form-YE6U',
          name: 'name'
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
        title: '子面板',
        newItemDefaults:
          '{{ (index) => ({ title: `折叠面板${index + 1}`, name: `name${index + 1}`,children: [] }) }}'
      },
      designKey: 'id-RQ1a',
      name: 'children'
    }
  ]}
} satisfies FormElement
