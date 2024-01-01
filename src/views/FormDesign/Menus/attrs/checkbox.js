import optionAttr from './common/optionAttr'
export default {
  items: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '初始值', component: 'input', name: 'initialValue' },
    { label: '是否必填', component: 'switch', name: 'required' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        {
          label: '自动选中第一项',
          component: 'switch',
          name: 'autoSelectedFirst'
        },
        {
          label: '选项样式类型',
          component: 'radio',
          name: 'optionType',
          props: {
            mode: 'static',
            options: [
              { label: '无边框', value: 'circle' },
              { label: '边框', value: 'border' },
              { label: '按钮', value: 'button' }
            ]
          },
          initialValue: 'circle'
        },
        {
          label: '选项间距',
          component: 'inputNumber',
          name: 'space',
          props: {
            min: 0
          },
          initialValue: 0
        },
        ...optionAttr
      ]
    }
  ]
}
