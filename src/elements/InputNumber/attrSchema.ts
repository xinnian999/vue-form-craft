export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    { label: '标签', component: 'Input', name: 'label' },
    {
      label: '唯一标识',
      component: 'Input',
      name: 'name',
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'Textarea', name: 'help' },
    {
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
      designKey: 'form-ekRL'
    },
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否只读', component: 'Switch', name: 'props.readonly' },
        { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
        { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
      ],
      props: {
        columns: 3,
        'row-gap': 0,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    },
    {
      label: '初始值',
      component: 'InputNumber',
      name: 'initialValue'
    },

    {
      label: '按钮位置',
      component: 'Radio',
      name: 'props.controlsPosition',
      props: {
        mode: 'static',
        options: [
          { label: '两侧', value: '' },
          { label: '内部', value: 'right' }
        ]
      },
      initialValue: ''
    },
    {
      label: '最小值',
      component: 'InputNumber',
      name: 'props.min',
    },
    {
      label: '最大值',
      component: 'InputNumber',
      name: 'props.max',
    },
    {
      label: '步长',
      component: 'InputNumber',
      name: 'props.step',
    },
    { label: '自定义class', component: 'Input', name: 'props.class' },
    {
      label: '自定义style',
      component: 'JsonEdit',
      name: 'props.style',
      help: '与vue的style对象格式一样',
      dialog: true
    }
  ]
}
