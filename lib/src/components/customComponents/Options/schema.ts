import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  initialValues: {
    componentProps: {
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
      name: 'componentProps.mode',
      component: 'Radio',
      componentProps: {
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
          target: 'componentProps.api.url',
          condition: "{{ $values.componentProps.mode === 'remote' && !$values.componentProps.api.url}}",
          value: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test'
        },
        {
          type: 'data',
          target: 'componentProps.api.method',
          condition: "{{ $values.componentProps.mode === 'remote' && !$values.componentProps.api.method}}",
          value: 'GET'
        },
        {
          type: 'data',
          target: 'componentProps.api',
          condition: "{{ $values.componentProps.mode === 'static' }}"
        },
        {
          type: 'data',
          target: 'componentProps.options',
          condition: "{{ $values.componentProps.mode === 'remote' }}"
        }
      ]
    },
    {
      label: '静态选项',
      name: 'componentProps.options',
      component: 'FormList',
      componentProps: {
        mode: 'table',
        title: '选项',
        getNewItem:
          '{{ (index) => {\n  return { label: `选项${index}`,value:`value${index}` }\n} }}'
      },
      labelAlign: 'top',
      when: '{{$values.componentProps.mode==="static"}}',
      children: [
        {
          label: '选项名',
          name: 'label',
          component: 'Input',
          componentProps: {
            placeholder: '请输入...'
          }
        },
        {
          label: '选项值',
          name: 'value',
          component: 'Input'
        },
        {
          label: '禁用',
          name: 'disabled',
          component: 'Switch'
        }
      ]
    },
    {
      name: 'form-remote',
      component: 'Card',
      componentProps: {},
      labelAlign: 'top',
      when: '{{$values.componentProps.mode!=="static"}}',
      children: [
        {
          name: 'form-divider-request',
          component: 'Divider',
          componentProps: {
            title: '请求',
            contentPosition: 'center'
          }
        },
        {
          label: 'url',
          name: 'componentProps.api.url',
          component: 'Input',
          labelAlign: 'top'
        },
        {
          label: '请求方式',
          name: 'componentProps.api.method',
          component: 'Radio',
          componentProps: {
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
          name: 'componentProps.api.params',
          component: 'CodeEditor',
          componentProps: {
            height: '150px',
            theme: 'vs-dark',
            language: 'json'
          },
          labelAlign: 'top'
        },
        {
          name: 'form-divider-response',
          component: 'Divider',
          componentProps: {
            title: '响应',
            contentPosition: 'center'
          }
        },
        {
          label: '数据路径',
          name: 'componentProps.api.dataPath',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'data'
        },
        {
          label: '标签key',
          name: 'componentProps.api.labelKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'label'
        },
        {
          label: '值Key',
          name: 'componentProps.api.valueKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'value'
        },
        {
          label: '禁用Key',
          name: 'componentProps.api.disabledKey',
          component: 'Input',
          labelAlign: 'top',
          defaultValue: 'disabled'
        }
      ]
    }
  ]
} satisfies FormSchema
