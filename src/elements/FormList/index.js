import attr from './attr'
import FormList from './FormList.vue'

export default {
  name: '自增容器',
  component: FormList,
  icon: 'formList',
  type: 'high',
  order: 1,
  isWrapper: true,
  isDefaultWrapper: true,
  initialValues: {
    label: '自增容器',
    component: 'FormList',
    children: []
  },
  attr
}
