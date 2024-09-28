import type { FormSchema } from "./commonType";

export default [
    {
        component: 'Divider',
        props: {
          title: '选项设置',
          contentPosition: 'center'
        },
        designKey: 'design-gSnX',
        name: 'form-xDEe',
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
        dialog:true,
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
            name: 'value',
            component: 'Input',
            props: {},
            designKey: 'form-HYtW'
          },
          {
            label: '是否禁用',
            name: 'disabled',
            component: 'Switch',
            props: {},
            designKey: 'form-HYtW2'
          }
        ],
        designKey: 'form-Iwpd',
        props: {
          mode: 'table'
          // newItemDefaults:
          //   '{{ (index) => ({ [$values.props.labelKey]: `选项${index + 1}`, [$values.props.valueKey]: `value${index + 1}` }) }}'
        }
      },
      {
        component: 'Card',
        props: {},
        designKey: 'id-pGeN',
        name: 'form-6vzT',
        hidden: '{{$values.props.mode==="static"}}',
        children: [
          {
            "component": "Title",
            "props": {
              "title": "请求",
              "type": "h4"
            },
            "hideLabel": true,
            "designKey": "design-49fr",
            "name": "form-Vf2D"
          },
          {
            label: 'url',
            component: 'Input',
            name: 'props.api.url',
            initialValue: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test',
            designKey: 'form-UrE8'
          },
          {
            label: '请求方式',
            component: 'Select',
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
              ]
            },
            designKey: 'form-nOpD'
          },
          {
            label: '请求参数',
            component: 'JsonEdit',
            name: 'props.api.params',
            initialValue: {},
            dialog: true
          },
          {
            "component": "Title",
            "props": {
              "title": "响应",
              "type": "h4"
            },
            "hideLabel": true,
            "designKey": "design-49fr",
            "name": "form-Vf2D"
          },
          {
            label: '数据路径',
            component: 'Input',
            name: 'props.api.dataPath',
            initialValue: 'data',
            designKey: 'form-UrE8'
          },
          {
            label: '标签key',
            component: 'Input',
            name: 'props.labelKey',
            initialValue:'label',
            designKey: 'form-X6hs'
          },
          {
            label: '值Key',
            component: 'Input',
            name: 'props.valueKey',
            initialValue:'value',
            designKey: 'form-STkl'
          },
          {
            label: '禁用Key',
            component: 'Input',
            name: 'props.disabledKey',
            initialValue:'disabled',
            designKey: 'form-STkl2'
          },
        ]
      }
] satisfies FormSchema['items']