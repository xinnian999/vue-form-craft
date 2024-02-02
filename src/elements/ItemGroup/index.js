import ItemGroup from './ItemGroup.vue'

export default {
  name: '字段组合',
  icon: 'itemGroup',
  type: 'high',
  component: ItemGroup,
  order: 2,
  isNotFormItem: true,
  isDefaultWrapper: true,
  initialValues: {
    component: 'ItemGroup',
    children: []
  },
  attr: [
    {
      component: 'Alert',
      props: {
        title: '说明',
        type: 'info',
        effect: 'light',
        description: '值是一个对象，此组件包裹的子字段都会引用这个对象的键值',
        closable: true,
        'show-icon': true
      },
      onlyId: 'form-fVKS',
      name: 'sv1sIQ',
      hideLabel: true,
      hidden: false
    },
    { label: '字段标识', component: 'Input', name: 'name' }
  ]
}
