import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '多选框组',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
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
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              designKey: 'design-basic',
              labelWidth: 0
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
              label: '选项样式',
              name: 'props.optionType',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  { label: '无边框', value: 'circle' },
                  { label: '边框', value: 'border' },
                  { label: '按钮', value: 'button' }
                ],
                optionType: 'button',
                space: 0
              },
              designKey: 'design-optionType'
            },
            {
              label: '排列方向',
              name: 'props.direction',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  { label: '水平', value: 'horizontal' },
                  { label: '垂直', value: 'vertical' }
                ],
                optionType: 'button',
                space: 0
              },
              designKey: 'design-direction'
            },
            {
              label: '选项间距',
              name: 'props.space',
              component: 'InputNumber',
              props: {
                unit: 'px',
                step: 5,
                controlsPosition: ''
              },
              designKey: 'design-space'
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
                },
                {
                  label: '是否禁用',
                  name: 'disabled',
                  component: 'Switch',
                  designKey: 'design-option-disabled'
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
                },
                {
                  label: '禁用Key',
                  labelAlign: 'top',
                  name: 'props.api.disabledKey',
                  component: 'Input',
                  designKey: 'design-api-disabledKey',
                  initialValue: 'disabled'
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
