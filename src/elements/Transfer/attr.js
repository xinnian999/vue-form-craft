import { optionAttr, linkageAttr, basic, props } from '../commonAttr'

export default [
  ...basic,
  {
    component: 'ItemGroup',
    name: 'props',
    children: [
      {
        component: 'Divider',
        props: {
          title: 'Props',
          contentPosition: 'center'
        },
        onlyId: 'form-Props',
        name: 'VekeRi',
        hidden: false
      },
      { label: '自定义class', component: 'Input', name: 'class' },
      {
        label: '自定义style',
        component: 'JsonEdit',
        name: 'style',
        initialValue: {},
        help: '与vue的style对象格式一样',
        props: {
          mode: 'dialog'
        }
      },
      { label: '是否禁用', component: 'Switch', name: 'disabled' },
      {
        label: '开启搜索',
        component: 'Switch',
        name: 'filterable',
        onlyId: 'form-ekRL12'
      },
      {
        label: '搜索占位符',
        component: 'Input',
        name: 'filter-placeholder',
        onlyId: 'form-ekRL123',
        initialValue: '请输入搜索关键词',
        hidden: '{{!$values.props.filterable}}'
      },
      {
        label: '标签key',
        component: 'Input',
        name: 'labelKey',
        initialValue: 'label',
        onlyId: 'form-X6hs'
      },
      {
        label: '值Key',
        component: 'Input',
        name: 'valueKey',
        initialValue: 'value',
        onlyId: 'form-STkl'
      },
      {
        label: '数据模式',
        component: 'Radio',
        name: 'mode',
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
          ]
        },
        initialValue: 'static',
        onlyId: 'form-PLpj'
      },
      {
        label: '静态选项',
        name: 'options',
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
            onlyId: 'form-LnGh'
          },
          {
            label: '选项值',
            name: '{{$values.props.valueKey}}',
            component: 'Input',
            props: {},
            onlyId: 'form-HYtW'
          }
        ],
        onlyId: 'form-Iwpd',
        props: {
          mode: 'table',
          newItemDefaults: (index) => ({ label: `选项${index + 1}`, value: `value${index + 1}` })
        }
      },
      {
        component: 'ItemGroup',
        name: 'api',
        hidden: '{{$values.props.mode==="static"}}',
        children: [
          {
            label: 'url',
            component: 'Input',
            name: 'url',
            initialValue: '/current/query/article',
            onlyId: 'form-UrE8'
          },
          {
            label: '请求方式',
            component: 'Radio',
            name: 'method',
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
            onlyId: 'form-nOpD'
          },
          {
            label: '请求参数',
            component: 'JsonEdit',
            name: 'params',
            hidden: '{{$values.props.api.method==="POST"||$values.props.api.method==="PUT"}}',
            initialValue: {}
          },
          {
            label: '请求参数',
            component: 'JsonEdit',
            name: 'data',
            hidden: '{{$values.props.api.method==="GET"||$values.props.api.method==="DELETE"}}',
            initialValue: {}
          },
          {
            label: '数据路径',
            component: 'Input',
            name: 'dataPath',
            initialValue: 'data',
            onlyId: 'form-UrE8'
          }
        ],
        onlyId: 'form-O8yj'
      }
    ],
    onlyId: 'form-qYXT'
  },

  ...linkageAttr
]
