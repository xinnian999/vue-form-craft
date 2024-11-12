import type { FormSchema } from '@vue-form-craft/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '电子签名',
    props: {
      width: 700,
      height: 300,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '#eeeeee',
      format: 'image/png'
    }
  },
  items: [
    { label: '标签', component: 'Input', name: 'label' },
    {
      label: '唯一标识',
      component: 'Input',
      name: 'name',
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'TextArea', name: 'help' },
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
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
    { label: '画板宽度(px)', component: 'InputNumber', name: 'props.width' },
    { label: '画板高度(px)', component: 'InputNumber', name: 'props.height' },
    { label: '画笔粗细-初始', component: 'InputNumber', name: 'props.lineWidth' },
    { label: '画笔颜色-初始', component: 'ColorPicker', name: 'props.lineColor' },
    { label: '画板背景色-初始', component: 'ColorPicker', name: 'props.bgColor' },
    {
      label: '生成图片格式',
      component: 'Radio',
      name: 'props.format',
      props: {
        mode: 'static',
        options: [
          {
            label: 'PNG',
            value: 'image/png'
          },
          {
            label: 'JPG',
            value: 'image/jpg'
          },
          {
            label: 'JPEG',
            value: 'image/jpeg'
          },
          {
            label: 'WEBP',
            value: 'image/webp'
          }
        ]
      },
      designKey: 'form-PLpj'
    }
  ]
} satisfies FormSchema
