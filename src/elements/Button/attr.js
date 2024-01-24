import { props } from '../commonAttr'

export default [
  { label: '字段label', component: 'Input', name: 'label' },
  { label: '字段标识', component: 'Input', name: 'name' },
  { label: '隐藏label', component: 'Switch', name: 'hideLabel' },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      ...props,
      { label: '按钮名称', component: 'Input', name: 'name' },
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
        component: 'Input',
        name: 'customEvent',
        hidden: '{{$values.props.clickEvent!=="custom"}}',
        help: '可以通过schemaContext注入自定义事件，然后通过插值获取。 例：{{ onTest }}'
      },
      // {
      //   label: '按钮颜色',
      //   component: 'ColorPicker',
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
