import basic from './commonAttr/basic'
import props from './commonAttr/props'
export default {
  name: '行内布局',
  initialValues: {
    label: '行内布局',
    component: 'inline',
    children: []
  },
  attr: [
    ...basic,
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        {
          label: '对齐方式',
          component: 'radio',
          name: 'align',
          props: {
            mode: 'static',
            options: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' }
            ]
          },
          initialValue: 'left'
        }
      ]
    }
  ]
}
