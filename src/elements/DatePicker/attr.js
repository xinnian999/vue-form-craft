import { linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  { label: '初始值', component: 'Input', name: 'initialValue' },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      ...props,
      { label: '是否禁用', component: 'Switch', name: 'disabled' },
      { label: '显示清除按钮', component: 'Switch', name: 'clearable' },
      {
        label: '占位提示',
        component: 'Input',
        name: 'placeholder',
        initialValue: '请输入...'
      },
      {
        label: '类型',
        component: 'Radio',
        name: 'type',
        props: {
          mode: 'static',
          options: [
            { label: '日期时间', value: 'datetime' },
            { label: '日期', value: 'date' },
            { label: '年月', value: 'month' },
            { label: '日期范围', value: 'daterange' },
            { label: '日期时间范围', value: 'datetimerange' }
          ]
        }
      }
    ]
  },
  ...linkageAttr
]
