import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
      mode: 'static',
      options: [
        {
          label: '选项1',
          value: 'value1'
        },
        {
          label: '选项2',
          value: 'value2'
        },
        {
          label: '选项3',
          value: 'value3'
        }
      ]
    }
  },
  items: [
    {
      label: '数据模式',
      name: 'props.mode',
      designKey: 'design-mode',
      component: 'Radio',
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
      labelAlign: 'top'
    },
    {
      label: '静态选项',
      name: 'props.options',
      designKey: 'design-options',
      component: 'FormList',
      props: {
        mode: 'table',
        title: '选项'
      },
      labelAlign: 'top',
      hidden: '{{$values.props.mode!=="static"}}',
      children: [
        {
          label: '选项名',
          name: 'label',
          designKey: 'design-option-label',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          initialValue: '{{ "选项" + ($index + 1) }}'
        },
        {
          label: '选项值',
          name: 'value',
          designKey: 'design-option-value',
          component: 'Input',
          initialValue: '{{ "value" + ($index + 1) }}'
        },
        {
          label: '是否禁用',
          name: 'disabled',
          designKey: 'design-option-disabled',
          component: 'Switch'
        }
      ]
    },
    {
      name: 'form-remote',
      designKey: 'design-remote-card',
      component: 'Card',
      props: {},
      labelAlign: 'top',
      hidden: '{{$values.props.mode==="static"}}',
      children: [
        {
          name: 'form-divider-request',
          designKey: 'design-divider-request',
          component: 'Divider',
          props: {
            title: '请求'
          }
        },
        {
          label: 'url',
          name: 'props.api.url',
          designKey: 'design-api-url',
          component: 'Input',
          labelAlign: 'top',
          initialValue: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test'
        },
        {
          label: '请求方式',
          name: 'props.api.method',
          designKey: 'design-api-method',
          component: 'Radio',
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
          },
          labelAlign: 'top',
          initialValue: 'GET'
        },
        {
          label: '请求参数',
          name: 'props.api.params',
          designKey: 'design-api-params',
          component: 'CodeEditor',
          props: {
            height: '150px',
            theme: 'vs-dark',
            language: 'json'
          },
          labelAlign: 'top'
        },
        {
          name: 'form-divider-response',
          designKey: 'design-divider-response',
          component: 'Divider',
          props: {
            title: '响应',
            contentPosition: 'center'
          }
        },
        {
          label: '数据路径',
          name: 'props.api.dataPath',
          designKey: 'design-api-dataPath',
          component: 'Input',
          labelAlign: 'top',
          initialValue: 'data'
        },
        {
          label: '标签key',
          name: 'props.api.labelKey',
          designKey: 'design-api-labelKey',
          component: 'Input',
          labelAlign: 'top',
          initialValue: 'label'
        },
        {
          label: '值Key',
          name: 'props.api.valueKey',
          designKey: 'design-api-valueKey',
          component: 'Input',
          labelAlign: 'top',
          initialValue: 'value'
        },
        {
          label: '禁用Key',
          name: 'props.api.disabledKey',
          designKey: 'design-api-disabledKey',
          component: 'Input',
          labelAlign: 'top',
          initialValue: 'disabled'
        }
      ]
    }
  ]
} satisfies FormSchema
