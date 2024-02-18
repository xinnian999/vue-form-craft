import attr from './attr'
import Grid from './Grid.vue'

export default {
  name: '栅格布局',
  icon: 'grid',
  type: 'layout',
  component: Grid,
  order: 3,

  isDefaultWrapper: true,
  initialValues: {
    component: 'Grid',
    children: [],
    props: {
      columns: 2,
      'column-gap': 20,
      'row-gap': 20
    }
  },
  attr
}
