import type { FormSchema } from 'vue-form-craft'

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
          designKey: 'form-LnGh'
        },
        {
          label: '选项值',
          name: 'key',
          component: 'Input',
          props: {},
          designKey: 'form-HYtW'
        }
      ],
      designKey: 'form-Iwpd',
      props: {
        mode: 'table',
        newItemDefaults:
          '{{ (index) => ({ label: `选项${index + 1}`, key: `value${index + 1}` }) }}'
      }
    },
  ]
} satisfies FormSchema
