import type { FormSchema } from '@/types'

export default [
  {
    component: 'Divider',
    props: {
      title: '选项设置',
      contentPosition: 'center'
    },
    name: 'form-xDEe'
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
    }
  },
  {
    label: '静态选项',
    name: 'props.options',
    component: 'FormList',
    hidden: '{{$values.props.mode!=="static"}}',
    children: [
      {
        label: '选项名',
        name: 'label',
        component: 'Input',
        props: {
          placeholder: '请输入...'
        },
        initialValue: '{{ "选项" + ($index + 1) }}'
      },
      {
        label: '选项值',
        name: 'value',
        component: 'Input',
        initialValue: '{{ "value" + ($index + 1) }}'
      },
      {
        label: '是否禁用',
        name: 'disabled',
        component: 'Switch'
      }
    ],
    props: {
      mode: 'table',
      title: '选项'
    }
  },
  {
    component: 'Card',
    props: {},
    name: 'form-6vzT',
    hidden: '{{$values.props.mode==="static"}}',
    children: [
      {
        component: 'Divider',
        props: {
          title: '请求'
        },
        name: 'form-Vf2D'
      },
      {
        label: 'url',
        component: 'Input',
        name: 'props.api.url',
        initialValue: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test'
      },
      {
        label: '请求方式',
        component: 'Radio',
        name: 'props.api.method',
        initialValue: 'GET',
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
          ],
          optionType: 'button',
          space: 0
        }
      },
      {
        label: '请求参数',
        component: 'JsonEditor',
        name: 'props.api.params',
        props: {
          toolBar: false
        }
      },
      {
        component: 'Divider',
        props: {
          title: '响应'
        },
        name: 'form-Vf2D111'
      },
      {
        label: '数据路径',
        component: 'Input',
        name: 'props.api.dataPath',
        initialValue: 'data'
      },
      {
        label: '标签key',
        component: 'Input',
        name: 'props.labelKey',
        initialValue: 'label'
      },
      {
        label: '值Key',
        component: 'Input',
        name: 'props.valueKey',
        initialValue: 'value'
      },
      {
        label: '禁用Key',
        component: 'Input',
        name: 'props.disabledKey',
        initialValue: 'disabled'
      }
    ]
  }
] satisfies FormSchema['items']
