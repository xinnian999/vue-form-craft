import attr from './attr'
import { Button } from '@/components'

export default {
  name: '按钮',
  component: Button,
  icon: 'button',
  type: 'assist',
  order: 1,
  initialValues: {
    component: 'Button',
    props: {
      name: '提交',
      type: 'primary'
    },
    hideLabel: true
  },
  attr
}
