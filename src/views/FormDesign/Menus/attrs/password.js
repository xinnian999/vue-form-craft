import linkageAttr from './common/linkageAttr'
import basic from './common/basic'
export default [
  ...basic,
  { label: '初始值', component: 'input', name: 'initialValue' },
  {
    label: 'props',
    component: 'itemGroup',
    name: 'props',
    children: [
      { label: '是否禁用', component: 'switch', name: 'disabled' },
      {
        label: '占位提示',
        component: 'input',
        name: 'placeholder',
        initialValue: '请输入...'
      }
    ]
  },

  ...linkageAttr
]
