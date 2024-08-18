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

    { label: '自定义class', component: 'Input', name: 'props.class' },

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
      label: '选项间距',
      component: 'InputNumber',
      name: 'props.space'
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
      label: '标签key',
      component: 'Input',
      name: 'props.labelKey',
      designKey: 'form-X6hs'
    },
    {
      label: '值Key',
      component: 'Input',
      name: 'props.valueKey',
      designKey: 'form-STkl'
    },
    {
      label: '数据模式',
      component: 'Radio',
      name: 'props.mode',
      props: {
        mode: 'static',
        options: [
          {
            label: '静态',
            value: 'static'
          },
          {
            label: '远程',
            value: 'remote'
          }
        ],
        optionType: 'button',
        space: 0
      },
      designKey: 'form-PLpj'
    },
    {
      label: '静态选项',
      name: 'props.options',
      component: 'FormList',
      hidden: '{{$values.props.mode!=="static"}}',
      children: [
        {
          label: '选项名',
          name: '{{$values.props.labelKey}}',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          designKey: 'form-LnGh'
        },
        {
          label: '选项值',
          name: '{{$values.props.valueKey}}',
          component: 'Input',
          props: {},
          designKey: 'form-HYtW'
        }
      ],
      designKey: 'form-Iwpd',
      props: {
        mode: 'table',
        newItemDefaults:
          '{{ (index) => ({ [$values.props.labelKey]: `选项${index + 1}`, [$values.props.valueKey]: `value${index + 1}` }) }}'
      }
    },
    {
      component: 'Card',
      props: {
        // header: '远程数据'
      },
      designKey: 'id-pGeN',
      name: 'form-6vzT',
      hidden: '{{$values.props.mode==="static"}}',
      children: [
        {
          label: 'url',
          component: 'Input',
          name: 'props.api.url',
          initialValue: '/current/query/article',
          designKey: 'form-UrE8'
        },
        {
          label: '请求方式',
          component: 'Radio',
          name: 'props.api.method',
          props: {
            mode: 'static',
            autoSelectedFirst: true,
            options: [
              {
                label: 'GET',
                value: 'GET'
              },
              {
                label: 'POST',
                value: 'POST'
              },
              {
                label: 'PUT',
                value: 'PUT'
              },
              {
                label: 'DELETE',
                value: 'DELETE'
              }
            ]
          },
          designKey: 'form-nOpD'
        },
        {
          label: '请求参数',
          component: 'JsonEdit',
          name: 'props.api.params',
          hidden: '{{ ["POST"].includes($values.props.api.method) }}',
          initialValue: {},
          props: {
            mode: 'dialog'
          }
        },
        {
          label: '请求参数',
          component: 'JsonEdit',
          name: 'props.api.data',
          hidden: '{{ ["GET"].includes($values.props.api.method) }}',
          initialValue: {},
          props: {
            mode: 'dialog'
          }
        },
        {
          label: '数据路径',
          component: 'Input',
          name: 'props.api.dataPath',
          initialValue: 'data',
          designKey: 'form-UrE8'
        }
      ]
    }
  ]
}
