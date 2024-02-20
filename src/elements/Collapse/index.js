import Collapse from './Collapse.vue'

export default {
  name: '折叠面板',
  component: Collapse,
  icon: 'card',
  type: 'layout',
  order: 4,
  isWrapper: true,
  initialValues: {
    component: 'Collapse',
    children: [{ title: '折叠面板1', key: 'key1', children: [] }]
  },
  attr: [
    { label: '字段标识', component: 'Input', name: 'name' },
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
          onlyId: 'id-l8cI',
          name: 'title'
        },
        {
          label: 'key',
          component: 'Input',
          props: {
            placeholder: '请输入key'
          },
          onlyId: 'form-YE6U',
          name: 'key'
        },
        {
          label: '默认展开',
          component: 'Switch',
          onlyId: 'form-YE6U',
          name: 'checked'
        }
      ],
      props: {
        mode: 'card',
        title: '子面板',
        newItemDefaults:
          '{{ (index) => ({ title: `折叠面板${index + 1}`, key: `key${index + 1}`,children: [] }) }}'
      },
      onlyId: 'id-RQ1a',
      name: 'children'
    }
  ]
}
