import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    componentProps: {
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
      help: "既是唯一标识，也是数据路径。比如输入【componentProps.name】，数据就会保存为 { componentProps: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'TextArea', name: 'help' },
    {
      component: 'Grid',
      items: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否禁用', component: 'Switch', name: 'componentProps.disabled' },
        { label: '渲染字段', component: 'Switch', name: 'when', defaultValue: '{{ true }}' }
      ],
      componentProps: {
        columns: 3,
        'row-gap': 20,
        'column-gap': 20
      },
      name: 'cNmCuu'
    },
    { label: '画板宽度(px)', component: 'InputNumber', name: 'componentProps.width' },
    { label: '画板高度(px)', component: 'InputNumber', name: 'componentProps.height' },
    { label: '画笔粗细-初始', component: 'InputNumber', name: 'componentProps.lineWidth' },
    { label: '画笔颜色-初始', component: 'ColorPicker', name: 'componentProps.lineColor' },
    { label: '画板背景色-初始', component: 'ColorPicker', name: 'componentProps.bgColor' },
    {
      label: '生成图片格式',
      component: 'Radio',
              name: 'componentProps.format',
      componentProps: {
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
      }
    }
  ]
} satisfies FormSchema
