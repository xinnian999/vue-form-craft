import Title from './Title.vue'
import attr from './attr'
export default {
  name: '标题',
  component: Title,
  icon: 'title',
  type: 'assist',
  order: 3,

  attr,
  initialValues: {
    component: 'Title',
    hideLabel: true,
    props: {
      title: '标题',
      type: 'h3'
    }
  }
}
