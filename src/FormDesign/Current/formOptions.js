export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    {
      label: 'label宽度',
      component: 'InputNumber',
      name: 'labelWidth',
      props: {
        min: 60,
        unit: 'px',
        step: 10
      },
      initialValue: 150
    },
    {
      label: 'label对齐方式',
      component: 'Radio',
      name: 'labelAlign',
      props: {
        mode: 'static',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居上', value: 'top' },
          { label: '右对齐', value: 'right' }
        ]
      },
      initialValue: 'right'
    },
    {
      label: '表单组件尺寸',
      component: 'Radio',
      name: 'size',
      props: {
        mode: 'static',
        options: [
          { label: '默认', value: 'default' },
          { label: '较小', value: 'small' },
          { label: '较大', value: 'large' }
        ]
      },
      initialValue: 'default'
    },
    { label: '隐藏必填星号', component: 'Switch', name: 'hideRequiredAsterisk' },
    { label: 'label加粗', component: 'Switch', name: 'labelBold' }
  ]
}
