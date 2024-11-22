import optionConfig from '@vue-form-craft/config/optionConfig'
import type { FormSchema } from '@vue-form-craft/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '多选框组',
    component: 'Checkbox',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      labelKey: 'label',
      valueKey: 'value',
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
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
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
      designKey: 'form-ekRL'
    },
    {
      label: '初始值',
      component: 'Select',
      name: 'initialValue',
      hidden: '{{ $values.props.mode==="remote" }}',
      props: {
        mode: 'static',
        options: '{{$values.props.options}}',
        multiple: true
      }
    },
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

    {
      label: '选项样式类型',
      component: 'Radio',
      name: 'props.optionType',
      props: {
        mode: 'static',
        options: [
          { label: '无边框', value: 'circle' },
          { label: '边框', value: 'border' },
          { label: '按钮', value: 'button' }
        ]
      }
    },
    {
      label: '选项排列方向',
      component: 'Radio',
      name: 'props.direction',
      props: {
        mode: 'static',
        options: [
          { label: '水平排列', value: 'horizontal' },
          { label: '垂直排列', value: 'vertical' }
        ]
      }
    },
    {
      label: '选项间距（px）',
      component: 'InputNumber',
      name: 'props.space'
    },

    ...optionConfig
  ]
} satisfies FormSchema
