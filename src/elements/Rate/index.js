import { ElRate } from 'element-plus'
import attr from './attr'

export default {
  name: '评分',
  component: ElRate,
  icon: 'rate',
  type: 'basic',
  order: 12,
  attr,
  initialValues: {
    label: '评分',
    component: 'Rate',
    props: {}
  }
}
