import type { FormSchema } from 'vue-form-craft'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '穿梭框',
    props: {
      data: [
        { label: '选项一', key: 'value1' },
        { label: '选项二', key: 'value2' },
        { label: '选项三', key: 'value3' }
      ]
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
    { label: '初始值', component: 'Input', name: 'initialValue' },
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
        'row-gap': 20,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',

    },

    {
      component: 'Divider',
      props: {
        title: '选项设置',
        contentPosition: 'center'
      },
      designKey: 'design-gSnX',
      name: 'form-xDEe',
      style: {
        marginTop: '40px'
      }
    },
    {
      label: '静态选项',
      name: 'props.data',
      component: 'FormList',
      children: [
        {
          label: '选项名',
          name: 'label',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          designKey: 'form-LnGh',
          initialValue: '{{ "选项" + ($index + 1) }}'
        },
        {
          label: '选项值',
          name: 'key',
          component: 'Input',
          designKey: 'form-HYtW',
          initialValue: '{{ "value" + ($index + 1) }}'
        }
      ],
      designKey: 'form-Iwpd',
      props: {
        mode: 'table'
      }
    }
  ]
} satisfies FormSchema
