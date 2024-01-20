import props from './commonAttr/props'
export default {
  name: '按钮',
  initialValues: {
    component: 'button',
    props: {
      name: '提交'
    },
    hideLabel: true
  },
  attr: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '隐藏label', component: 'switch', name: 'hideLabel' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        { label: '按钮名称', component: 'input', name: 'name' },
        {
          label: '点击事件',
          component: 'select',
          name: 'clickEvent',
          props: {
            mode: 'static',
            options: [
              { label: '提交表单', value: 'submitForm' },
              { label: '重置表单', value: 'resetForm' },
              { label: '自定义', value: 'custom' }
            ]
          },
          initialValue: 'submitForm'
        },
        {
          label: '自定义事件',
          component: 'input',
          name: 'customEvent',
          hidden: '{{$form.props.clickEvent!=="custom"}}',
          help: '可以通过schemaContext注入自定义事件，然后通过插值获取。 例：{{ onTest }}'
        },
        // {
        //   label: '按钮颜色',
        //   component: 'colorPicker',
        //   name: 'color'
        // },
        {
          label: '样式',
          component: 'jsonEdit',
          name: 'style',
          initialValue: {},
          props: {
            mode: 'direct'
          }
        }
      ]
    }
  ]
}
