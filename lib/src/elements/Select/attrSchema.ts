import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '下拉选择框',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      placeholder: '请选择...'
    }
  },
  items: [
    {
      name: 'form-2DaW',
      component: 'Tabs',
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      designKey: 'design-wUHG',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-1',
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
              designKey: 'design-njXF'
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
              designKey: 'design-gfim'
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
              designKey: 'design-UcmF'
            },
            {
              label: '标签位置',
              name: 'labelAlign',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '居左',
                    value: 'left'
                  },
                  {
                    label: '居上',
                    value: 'top'
                  },
                  {
                    label: '居右',
                    value: 'right'
                  }
                ]
              },
              designKey: 'design-EiOs'
            },
            {
              label: '尺寸',
              name: 'size',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '默认',
                    value: 'default'
                  },
                  {
                    label: '较小',
                    value: 'small'
                  },
                  {
                    label: '较大',
                    value: 'large'
                  }
                ]
              },
              designKey: 'design-yaZ4'
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
              designKey: 'design-Qh45'
            },
            {
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              props: {
                autocomplete: 'new-password'
              },
              designKey: 'design-JTMu'
            },
            {
              label: '隐藏',
              name: 'hidden',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-C5Qj'
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-VnLN'
            },
            {
              label: '选择模式',
              name: 'props.multiple',
              component: 'Switch',
              props: {
                'active-text': '多选',
                'inactive-text': '单选'
              },
              designKey: 'design-6Tga'
            }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          component: 'TabPane',
          designKey: 'tab-7',
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
              designKey: 'design-o5tb'
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
              designKey: 'design-GFpA',
              hidden: '{{$values.props.mode!=="static"}}',
              children: [
                {
                  label: '选项名',
                  name: 'label',
                  component: 'Input',
                  props: {
                    placeholder: '请输入...'
                  },
                  designKey: 'design-fMNm',
                  initialValue: '{{ "选项" + ($index + 1) }}'
                },
                {
                  label: '选项值',
                  name: 'value',
                  component: 'Input',
                  designKey: 'design-sQhP',
                  initialValue: '{{ "value" + ($index + 1) }}'
                },
                {
                  label: '是否禁用',
                  name: 'disabled',
                  component: 'Switch',
                  designKey: 'design-FYkF'
                }
              ]
            },
            {
              name: 'form-6vzT',
              component: 'Card',
              props: {},
              labelAlign: 'top',
              designKey: 'design-F2xe',
              hidden: '{{$values.props.mode==="static"}}',
              children: [
                {
                  name: 'form-Vf2D',
                  component: 'Divider',
                  props: {
                    title: '请求'
                  },
                  designKey: 'design-dN3f'
                },
                {
                  label: 'url',
                  labelAlign: 'top',
                  name: 'props.api.url',
                  component: 'Input',
                  designKey: 'design-GlX5',
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
                  designKey: 'design-zvMl',
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
                  designKey: 'design-qD5K'
                },
                {
                  name: 'form-Vf2D111',
                  component: 'Divider',
                  props: {
                    title: '响应'
                  },
                  designKey: 'design-WgIP'
                },
                {
                  label: '数据路径',
                  labelAlign: 'top',
                  name: 'props.api.dataPath',
                  component: 'Input',
                  designKey: 'design-xhhV',
                  initialValue: 'data'
                },
                {
                  label: '标签key',
                  labelAlign: 'top',
                  name: 'props.api.labelKey',
                  component: 'Input',
                  designKey: 'design-AZqq',
                  initialValue: 'label'
                },
                {
                  label: '值Key',
                  labelAlign: 'top',
                  name: 'props.api.valueKey',
                  component: 'Input',
                  designKey: 'design-ksqH',
                  initialValue: 'value'
                },
                {
                  label: '禁用Key',
                  labelAlign: 'top',
                  name: 'props.api.disabledKey',
                  component: 'Input',
                  designKey: 'design-tHNq',
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
          designKey: 'tab-2',
          children: [
            {
              label: '必填',
              name: 'required',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-TA5Q'
            },
            {
              label: '校验规则',
              name: 'rules',
              component: 'FormList',
              props: {
                mode: 'card',
                title: '规则'
              },
              designKey: 'design-rules',
              labelAlign: 'top',
              children: [
                {
                  label: '规则类型',
                  name: 'type',
                  component: 'Select',
                  props: {
                    placeholder: '请选择规则类型',
                    mode: 'static',
                    options: [
                      {
                        label: '必填',
                        value: 'required'
                      },
                      {
                        label: '最小长度',
                        value: 'min'
                      },
                      {
                        label: '最大长度',
                        value: 'max'
                      },
                      {
                        label: '正则表达式',
                        value: 'pattern'
                      },
                      {
                        label: '内置类型',
                        value: 'builtin'
                      },
                      {
                        label: '枚举值',
                        value: 'enum'
                      },
                      {
                        label: '自定义函数',
                        value: 'custom'
                      },
                      {
                        label: 'JS表达式',
                        value: 'jsExpr'
                      }
                    ]
                  },
                  designKey: 'design-rule-type'
                },
                {
                  label: '最小值',
                  name: 'value',
                  component: 'InputNumber',
                  props: {
                    placeholder: '请输入最小长度',
                    min: 0,
                    controlsPosition: ''
                  },
                  designKey: 'design-rule-min',
                  hidden: "{{ $item.type !== 'min' }}"
                },
                {
                  label: '最大值',
                  name: 'value',
                  component: 'InputNumber',
                  props: {
                    placeholder: '请输入最大长度',
                    min: 0
                  },
                  designKey: 'design-rule-max',
                  hidden: "{{ $item.type !== 'max' }}"
                },
                {
                  label: '正则表达式',
                  name: 'value',
                  component: 'Autocomplete',
                  props: {
                    placeholder: '请输入正则表达式，如：^[0-9]+$',
                    options: [
                      {
                        label: '邮箱',
                        value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
                      },
                      {
                        label: '手机号',
                        value: '^1[3-9]\\d{9}$'
                      },
                      {
                        label: 'QQ号',
                        value: '^[1-9][0-9]{4,10}$'
                      },
                      {
                        label: '身份证号',
                        value:
                          '^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[\\dxX]$'
                      },
                      {
                        label: '中文',
                        value: '^[一-龥]+$'
                      },
                      {
                        label: '网址',
                        value: '^http(s)?:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?'
                      },
                      {
                        label: 'IP地址',
                        value:
                          '^(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$'
                      },
                      {
                        label: '邮政编码',
                        value: '^[1-9]\\d{5}$'
                      },
                      {
                        label: '字母+数字',
                        value: '^[a-zA-Z0-9]+$'
                      }
                    ]
                  },
                  designKey: 'design-rule-pattern',
                  hidden: "{{ $item.type !== 'pattern' }}",
                  help: '输入正则表达式字符串，不需要包含斜杠'
                },
                {
                  label: '内置类型',
                  name: 'value',
                  component: 'Select',
                  props: {
                    placeholder: '请选择内置类型',
                    mode: 'static',
                    options: [
                      {
                        label: '字符串',
                        value: 'string'
                      },
                      {
                        label: '数字',
                        value: 'number'
                      },
                      {
                        label: '布尔值',
                        value: 'boolean'
                      },
                      {
                        label: '方法',
                        value: 'method'
                      },
                      {
                        label: '正则',
                        value: 'regexp'
                      },
                      {
                        label: '整数',
                        value: 'integer'
                      },
                      {
                        label: '浮点数',
                        value: 'float'
                      },
                      {
                        label: '数组',
                        value: 'array'
                      },
                      {
                        label: '对象',
                        value: 'object'
                      },
                      {
                        label: '枚举',
                        value: 'enum'
                      },
                      {
                        label: '日期',
                        value: 'date'
                      },
                      {
                        label: 'URL',
                        value: 'url'
                      },
                      {
                        label: '十六进制',
                        value: 'hex'
                      },
                      {
                        label: '邮箱',
                        value: 'email'
                      },
                      {
                        label: '任意类型',
                        value: 'any'
                      }
                    ]
                  },
                  designKey: 'design-rule-builtin',
                  hidden: "{{ $item.type !== 'builtin' }}",
                  help: '使用 async-validator 内置类型校验'
                },
                {
                  label: '枚举值',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    placeholder: '请输入枚举值，每行一个',
                    autosize: {
                      minRows: 3,
                      maxRows: 6
                    }
                  },
                  designKey: 'design-rule-enum',
                  hidden: "{{ $item.type !== 'enum' }}",
                  help: '每行输入一个可选值'
                },
                {
                  label: '自定义函数体',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    placeholder:
                      'if (value.length < 6) {\n  callback(new Error("长度不足"));\n} else {\n  callback();\n}',
                    autosize: {
                      minRows: 4,
                      maxRows: 10
                    }
                  },
                  designKey: 'design-rule-custom',
                  hidden: "{{ $item.type !== 'custom' }}",
                  help: '函数参数：rule, value, callback'
                },
                {
                  label: 'JS表达式',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    autosize: {
                      minRows: 2,
                      maxRows: 6
                    }
                  },
                  designKey: 'design-rule-jsexpr',
                  hidden: "{{ $item.type !== 'jsExpr' }}",
                  help: '使用 {{ }} 包裹表达式，返回布尔值'
                },
                {
                  label: '错误提示',
                  name: 'message',
                  component: 'Input',
                  props: {
                    placeholder: '请输入校验失败时的提示信息'
                  },
                  designKey: 'design-rule-message'
                },
                {
                  label: '触发时机',
                  name: 'trigger',
                  component: 'Radio',
                  props: {
                    mode: 'static',
                    options: [
                      {
                        label: '失焦时',
                        value: 'blur'
                      },
                      {
                        label: '输入时',
                        value: 'change'
                      }
                    ]
                  },
                  designKey: 'design-rule-trigger'
                }
              ]
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
          designKey: 'tab-3',
          children: [
            {
              label: '联动规则',
              name: 'linkages',
              component: 'FormList',
              props: {
                mode: 'card',
                title: '联动规则'
              },
              designKey: 'design-linkages',
              labelAlign: 'top',
              children: [
                {
                  label: '目标字段',
                  name: 'target',
                  component: 'Input',
                  props: {
                    placeholder: '目标字段的 name',
                    clearable: true
                  },
                  designKey: 'design-link-target'
                },
                {
                  label: '触发条件',
                  name: 'condition',
                  component: 'TextArea',
                  props: {
                    autosize: {
                      minRows: 2,
                      maxRows: 4
                    },
                    clearable: true
                  },
                  designKey: 'design-link-condition',
                  help: '请输入 JS 表达式，当结果为 true 时才触发联动。<br/> 不设置会一直触发'
                },
                {
                  label: '修改类型',
                  name: 'type',
                  component: 'Radio',
                  props: {
                    mode: 'static',
                    optionType: 'button',
                    options: [
                      {
                        label: '修改属性',
                        value: 'attr'
                      },
                      {
                        label: '修改数据',
                        value: 'data'
                      }
                    ]
                  },
                  designKey: 'design-link-type',
                  initialValue: 'attr',
                  linkages: [
                    {
                      target: 'path',
                      type: 'data',
                      condition: "{{ $item.type === 'data' }}",
                      value: ''
                    },
                    {
                      target: 'customPath',
                      type: 'data',
                      condition: "{{ $item.type === 'data' }}",
                      value: ''
                    }
                  ]
                },
                {
                  label: '属性',
                  name: 'path',
                  component: 'Select',
                  props: {
                    placeholder: '请选择要修改的配置属性',
                    clearable: true,
                    mode: 'static',
                    options: [
                      {
                        label: '禁用状态',
                        value: 'props.disabled'
                      },
                      {
                        label: '隐藏状态',
                        value: 'hidden'
                      },
                      {
                        label: '必填状态',
                        value: 'required'
                      },
                      {
                        label: '自定义',
                        value: 'custom'
                      }
                    ]
                  },
                  designKey: 'design-link-config-attr',
                  hidden: "{{ $item.type !== 'attr' }}"
                },
                {
                  label: '自定义属性',
                  name: 'customPath',
                  component: 'Input',
                  props: {
                    clearable: true
                  },
                  designKey: 'design-link-custom-path',
                  hidden: "{{  $item.path !== 'custom' }}"
                },
                {
                  label: '值',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    autosize: {
                      minRows: 2,
                      maxRows: 4
                    },
                    clearable: true
                  },
                  designKey: 'design-link-config-value'
                }
              ]
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
          designKey: 'tab-5',
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
          designKey: 'tab-6',
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              designKey: 'design-KaWx',
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
