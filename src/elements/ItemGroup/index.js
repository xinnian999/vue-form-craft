import ItemGroup from './ItemGroup.vue'

export default {
  name: '字段组合',
  icon: 'itemGroup',
  type: 'high',
  component: ItemGroup,
  order: 2,
  isDefaultWrapper: true,
  initialValues: {
    component: 'ItemGroup',
    children: [],
    props: {
      type: 'object'
    }
  },
  attr: [
    { label: '字段标识', component: 'Input', name: 'name' },
    {
      label: 'props',
      component: 'ItemGroup',
      name: 'props',
      children: [
        {
          label: '组合类型',
          component: 'Radio',
          name: 'type',
          props: {
            mode: 'static',
            options: [
              { label: '对象', value: 'object' },
              { label: '数组', value: 'array' }
            ]
          }
        },
        {
          component: 'Alert',
          props: {
            title: '说明',
            type: 'info',
            effect: 'light',
            description:
              '{{  `此组件包裹的子字段会组成一个${$values.props.type==="object"?"对象":"数组"}`  }}',
            closable: true,
            'show-icon': true
          },
          onlyId: 'form-fVKS',
          name: 'sv1sIQ',
          hideLabel: true,
          hidden: false
        }
      ]
    }
  ]
}
