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
  attr: [{ label: '字段标识', component: 'Input', name: 'name' }]
}
