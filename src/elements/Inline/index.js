import attr from './attr'
import Inline from './Inline.vue'

export default {
  name: '行内布局',
  icon: 'inline',
  type: 'layout',
  component: Inline,
  order: 2,

  initialValues: {
    component: 'Inline',
    children: [],
    props: {
      align: 'left',
      gap: 20
    }
  },
  attr
}
