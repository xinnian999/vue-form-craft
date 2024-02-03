import attr from './attr'
import Divider from './Divider.vue'

export default {
  name: '分割线',
  component: Divider,
  icon: 'divider',
  type: 'assist',
  order: 6,
  isNotFormItem: true,
  attr,
  initialValues: {
    component: 'Divider',
    props: {
      title: '分割线'
    }
  }
}
