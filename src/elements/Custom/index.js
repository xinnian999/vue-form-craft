import attr from './attr'
import Custom from './Custom.vue'

export default {
  name: '自定义组件',
  icon: 'custom',
  type: 'high',
  order: 3,
  component: Custom,
  initialValues: {
    label: '自定义组件',
    component: 'Custom',
    props: {}
  },
  attr
}
