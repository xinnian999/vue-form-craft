import attr from './attr'
import Inline from './Inline.vue'

export default {
  name: '行内布局',
  icon: 'inline',
  type: 'layout',
  component: Inline,
  order: 2,

  isDefaultWrapper: true,
  initialValues: {
    component: 'Inline',
    children: [],
    props: {
      align: 'left',
      margin: 20
    }
  },
  attr
}
