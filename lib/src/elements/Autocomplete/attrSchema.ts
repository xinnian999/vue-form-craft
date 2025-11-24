import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '自动完成',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      placeholder: '请输入...'
    }
  },
  items: [
    {
      name: 'form-tabs',
      component: 'Tabs',
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      designKey: 'design-tabs',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-attrs',
          children: [
            {
              label: '字段标识',
              name: 'name',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password',
                clearable: true
              },
              designKey: 'design-name'
            },
            {
              label: '标签',
              name: 'label',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password',
                clearable: true
              },
              designKey: 'design-label'
            },
            {
              label: '标签宽度',
              name: 'labelWidth',
              component: 'InputNumber',
              props: {
                unit: 'px',
                step: 10,
                controlsPosition: ''
              },
              designKey: 'design-labelWidth'
            },
            {
              label: '标签位置',
              name: 'labelAlign',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  { label: '居左', value: 'left' },
                  { label: '居上', value: 'top' },
                  { label: '居右', value: 'right' }
                ]
              },
              designKey: 'design-labelAlign'
            },
            {
              label: '组件大小',
              name: 'size',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  { label: '默认', value: 'default' },
                  { label: '较小', value: 'small' },
                  { label: '较大', value: 'large' }
                ]
              },
              designKey: 'design-size'
            },
            {
              label: '气泡提示',
              name: 'help',
              component: 'TextArea',
              props: {
                placeholder: '',
                autosize: {
                  minRows: 2,
                  maxRows: 999
                },
                clearable: true
              },
              designKey: 'design-help'
            },
            {
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              props: {
                autocomplete: 'new-password'
              },
              designKey: 'design-placeholder'
            },
            {
              label: '隐藏',
              name: 'hidden',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-hidden'
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-disabled'
            },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-readonly'
            },
            {
              label: '显示清除按钮',
              name: 'props.clearable',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-clearable'
            },
            {
              label: '最长字数',
              name: 'props.maxlength',
              component: 'InputNumber',
              props: {
                min: 0,
                controlsPosition: ''
              },
              designKey: 'design-maxlength'
            }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          component: 'TabPane',
          designKey: 'tab-options',
          children: [
            {
              label: '数据模式',
              labelAlign: 'top',
              name: 'props.mode',
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
              designKey: 'design-mode'
            },
            {
              label: '静态选项',
              labelAlign: 'top',
              name: 'props.options',
              component: 'FormList',
              props: {
                mode: 'table',
                title: '选项'
              },
              designKey: 'design-options',
              hidden: '{{$values.props.mode!=="static"}}',
              children: [
                {
                  label: '选项名',
                  name: 'label',
                  component: 'Input',
                  props: {
                    placeholder: '请输入...'
                  },
                  designKey: 'design-option-label',
                  initialValue: '{{ "选项" + ($index + 1) }}'
                },
                {
                  label: '选项值',
                  name: 'value',
                  component: 'Input',
                  designKey: 'design-option-value',
                  initialValue: '{{ "value" + ($index + 1) }}'
                }
              ]
            },
            {
              name: 'form-remote',
              component: 'Card',
              props: {},
              labelAlign: 'top',
              designKey: 'design-remote-card',
              hidden: '{{$values.props.mode==="static"}}',
              children: [
                {
                  name: 'form-divider-request',
                  component: 'Divider',
                  props: {
                    title: '请求'
                  },
                  designKey: 'design-divider-request'
                },
                {
                  label: 'url',
                  labelAlign: 'top',
                  name: 'props.api.url',
                  component: 'Input',
                  designKey: 'design-api-url',
                  initialValue: 'https://apifoxmock.com/m1/5213940-4880280-default/options/test'
                },
                {
                  label: '请求方式',
                  labelAlign: 'top',
                  name: 'props.api.method',
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
                  designKey: 'design-api-method',
                  initialValue: 'GET'
                },
                {
                  label: '请求参数',
                  labelAlign: 'top',
                  name: 'props.api.params',
                  component: 'JsonEditor',
                  props: {
                    toolBar: false
                  },
                  designKey: 'design-api-params'
                },
                {
                  name: 'form-divider-response',
                  component: 'Divider',
                  props: {
                    title: '响应'
                  },
                  designKey: 'design-divider-response'
                },
                {
                  label: '数据路径',
                  labelAlign: 'top',
                  name: 'props.api.dataPath',
                  component: 'Input',
                  designKey: 'design-api-dataPath',
                  initialValue: 'data'
                },
                {
                  label: '标签key',
                  labelAlign: 'top',
                  name: 'props.api.labelKey',
                  component: 'Input',
                  designKey: 'design-api-labelKey',
                  initialValue: 'label'
                },
                {
                  label: '值Key',
                  labelAlign: 'top',
                  name: 'props.api.valueKey',
                  component: 'Input',
                  designKey: 'design-api-valueKey',
                  initialValue: 'value'
                }
              ]
            }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-rules',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Rules'
              },
              designKey: 'design-KaWx11',
              labelWidth: 0
            }
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-linkages',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Linkages'
              },
              designKey: 'design-linkages-custom',
              labelWidth: 0
            }
          ]
        },
        {
          label: '事件',
          name: 'events',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-events',
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change',
              labelAlign: 'top'
            },
            {
              label: '失去焦点时 (blur)',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              designKey: 'design-event-blur',
              labelAlign: 'top'
            },
            {
              label: '获得焦点时 (focus)',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              designKey: 'design-event-focus',
              labelAlign: 'top'
            },
            {
              label: '输入时 (input)',
              name: 'props.onInput',
              component: 'FunctionEditor',
              designKey: 'design-event-input',
              labelAlign: 'top'
            },
            {
              label: '清空时 (clear)',
              name: 'props.onClear',
              component: 'FunctionEditor',
              designKey: 'design-event-clear',
              labelAlign: 'top'
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-style',
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              designKey: 'design-style',
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
