import basic from './commonAttr/basic'
import props from './commonAttr/props'
import linkageAttr from './commonAttr/linkageAttr'
import { ElDatePicker } from 'element-plus'

export default {
  name: '日期选择器',
  component: ElDatePicker,
  initialValues: {
    label: '日期选择器',
    component: 'datePicker',
    props: {
      type: 'datetime'
    }
  },
  attr: [
    ...basic,
    { label: '初始值', component: 'input', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        { label: '显示清除按钮', component: 'switch', name: 'clearable' },
        {
          label: '占位提示',
          component: 'input',
          name: 'placeholder',
          initialValue: '请输入...'
        },
        {
          label: '类型',
          component: 'radio',
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
}
