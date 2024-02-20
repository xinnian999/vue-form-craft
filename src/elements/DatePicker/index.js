import { ElDatePicker } from 'element-plus'
import attr from './attr'

export default {
  name: '日期选择器',
  component: ElDatePicker,
  icon: 'datePicker',
  type: 'basic',
  order: 9,
  initialValues: {
    label: '日期选择器',
    component: 'DatePicker',
    props: {
      type: 'datetime',
      placeholder: '请选择日期',
      clearable: false
    }
  },
  attr
}
