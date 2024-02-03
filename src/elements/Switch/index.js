import { ElSwitch } from 'element-plus'
import attr from './attr'

export default {
  name: '开关',
  component: ElSwitch,
  icon: 'switch',
  type: 'basic',
  order: 8,
  initialValues: { label: '开关', component: 'Switch' },
  attr
}
