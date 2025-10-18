import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '级联选择器',
    props: {
      placeholder: '请选择...',
      mode: 'static',
      options: [
        {
          label: '选项1',
          value: 'value1',
          children: [
            {
              label: '选项1-1',
              value: 'value1-1'
            },
            {
              label: '选项1-2',
              value: 'value1-2'
            },
            {
              label: '选项1-3',
              value: 'value1-2'
            }
          ]
        },
        {
          label: '选项2',
          value: 'value2',
          children: [
            {
              label: '选项2-1',
              value: 'value2-1'
            },
            {
              label: '选项2-2',
              value: 'value2-2'
            },
            {
              label: '选项2-3',
              value: 'value2-2'
            }
          ]
        },
        {
          label: '选项3',
          value: 'value3'
        }
      ],
      labelKey: 'label',
      valueKey: 'value'
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
        'row-gap': 20,
        'column-gap': 20
      },
      name: 'cNmCuu'
    },
    {
      label: '选择模式',
      component: 'Switch',
      name: 'props.multiple',
      props: {
        'active-text': '多选',
        'inactive-text': '单选'
      },
    },

    {
      label: '显示每一级',
      component: 'Switch',
      name: 'props.showAllLevels',
      initialValue: true
    },

    {
      component: 'Divider',
      props: {
        title: '选项设置',
        contentPosition: 'center'
      },
      name: 'form-xDEe',
      style: {
        marginTop: '40px'
      }
    },
    {
      label: '标签key',
      component: 'Input',
      name: 'props.labelKey',
    },
    {
      label: '值Key',
      component: 'Input',
      name: 'props.valueKey',
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
      initialValue: 'static',
    },
    {
      label: '静态选项',
      name: 'props.options',
      component: 'JsonEdit',
      dialog: true
    },
    {
      component: 'Card',
      props: {
        // header: '远程数据'
      },
      name: 'form-6vzT',
      hidden: '{{$values.props.mode==="static"}}',
      children: [
        {
          label: 'url',
          component: 'Input',
          name: 'props.api.url',
          initialValue: '/current/query/article',
        },
        {
          label: '请求方式',
          component: 'Radio',
          name: 'props.api.method',
          props: {
            mode: 'static',
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
        },
        {
          label: '请求参数',
          component: 'JsonEdit',
          name: 'props.api.params',
          initialValue: {},
          dialog: true
        },
        {
          label: '数据路径',
          component: 'Input',
          name: 'props.api.dataPath',
          initialValue: 'data',
        }
      ]
    }
  ]
} as FormSchema
