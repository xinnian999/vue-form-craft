import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: true,
  initialValues: {
    props: {
      mode: 'remote',
      api: {
        url: '999999',
        method: 'POST'
      }
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
        ]
      },
      labelAlign: 'top',
      linkages: [
        {
          type: 'data',
          target: 'props.api.url',
          condition: "{{ $values.props.mode === 'remote' && !$values.props.api.url}}",
          value: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test'
        },
        {
          type: 'data',
          target: 'props.api.method',
          condition: "{{ $values.props.mode === 'remote' && !$values.props.api.method}}",
          value: 'GET'
        },
        {
          type: 'data',
          target: 'props.api',
          condition: "{{ $values.props.mode === 'static' }}"
        },
        {
          type: 'data',
          target: 'props.options',
          condition: "{{ $values.props.mode === 'remote' }}"
        }
      ]
    },
    {
      label: '静态选项',
      name: 'props.options',
      designKey: 'design-options',
      component: 'FormList',
      props: {
        mode: 'table',
        title: '选项',
        getNewItem:
          '{{ (index) => {\n  return { label: `选项${index}`,value:`value${index}` }\n} }}'
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
          }
        },
        {
          label: '选项值',
          name: 'value',
          designKey: 'design-option-value',
          component: 'Input'
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
            title: '请求',
            contentPosition: 'center'
          }
        },
        {
          label: 'url',
          name: 'props.api.url',
          designKey: 'design-api-url',
          component: 'Input',
          labelAlign: 'top'
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
            ]
          },
          labelAlign: 'top'
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
          defaultValue: 'data'
        },
        {
          label: '标签key',
          name: 'props.api.labelKey',
          designKey: 'design-api-labelKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'label'
        },
        {
          label: '值Key',
          name: 'props.api.valueKey',
          designKey: 'design-api-valueKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'value'
        },
        {
          label: '禁用Key',
          name: 'props.api.disabledKey',
          designKey: 'design-api-disabledKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'disabled'
        }
      ]
    }
  ]
} satisfies FormSchema
