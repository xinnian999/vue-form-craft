import { ElAlert } from 'element-plus'
import attr from './attr'
export default {
  name: '提示框',
  component: ElAlert,
  icon: 'alert',
  type: 'assist',
  order: 2,
  isNotFormItem: true,
  attr,
  initialValues: {
    component: 'Alert',
    hideLabel: true,
    props: {
      title: '提示信息',
      type: 'info',
      effect: 'light',
      description: '这是一个描述',
      closable: true,
      'show-icon': true
    }
  }
}
