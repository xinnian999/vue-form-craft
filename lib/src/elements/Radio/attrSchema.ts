import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '单选框组',
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
      ],
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
    }
  },
  items: [
    {
      name: 'form-tabs',
      designKey: 'design-tabs',
      component: 'Tabs',
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          designKey: 'tab-attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-basic',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '隐藏',
              name: 'hidden',
              designKey: 'design-hidden',
              component: 'Switch',
              props: {
                'inline-prompt': false
              }
            },
            {
              label: '禁用',
              name: 'props.disabled',
              designKey: 'design-disabled',
              component: 'Switch',
              props: {
                'inline-prompt': false
              }
            },
            {
              label: '选项样式',
              name: 'props.optionType',
              designKey: 'design-optionType',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '无边框',
                    value: 'circle'
                  },
                  {
                    label: '边框',
                    value: 'border'
                  },
                  {
                    label: '按钮',
                    value: 'button'
                  }
                ],
                optionType: 'button',
                space: 0
              }
            },
            {
              label: '排列方向',
              name: 'props.direction',
              designKey: 'design-direction',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '水平',
                    value: 'horizontal'
                  },
                  {
                    label: '垂直',
                    value: 'vertical'
                  }
                ],
                optionType: 'button',
                space: 0
              }
            },
            {
              label: '选项间距',
              name: 'props.space',
              designKey: 'design-space',
              component: 'InputNumber',
              props: {
                unit: 'px',
                step: 5,
                controlsPosition: ''
              }
            }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          designKey: 'tab-options',
          component: 'TabPane',
          children: [
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
                  component: 'JsonEditor',
                  props: {
                    toolBar: false
                  },
                  labelAlign: 'top'
                },
                {
                  name: 'form-divider-response',
                  designKey: 'design-divider-response',
                  component: 'Divider',
                  props: {
                    title: '响应'
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
        },
        {
          label: '校验',
          name: 'rules',
          designKey: 'tab-rules',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-KaWx11',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Rules'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          designKey: 'tab-linkages',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-linkages-custom',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Linkages'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '事件',
          name: 'events',
          designKey: 'tab-events',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              designKey: 'design-event-change',
              component: 'FunctionEditor',
              labelAlign: 'top'
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          designKey: 'tab-style',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '',
              name: 'props.style',
              designKey: 'design-style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '插槽',
          name: 'slots',
          component: 'TabPane',
          children: [
            {
              label: '选项内容',
              name: 'props.slots.default',
              designKey: 'design-1W4w',
              component: 'FunctionEditor'
            }
          ],
          designKey: 'tab-7'
        }
      ]
    }
  ]
} satisfies FormSchema
