import type { FormSchema } from 'form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '单行文本'
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
              label: 'ID',
              name: 'id',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password'
              },
              designKey: 'design-kC5y'
            },
            {
              label: 'class',
              name: 'class',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password'
              },
              designKey: 'design-BmcU'
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
              label: '自定义组件名称',
              component: 'Input',
              name: 'props.componentName',
              props: { placeholder: '全局组件名称' },
              designKey: 'design-component-name'
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
                    min: 0
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
          label: '布局',
          name: 'name4',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-4',
          children: [
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
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          component: 'TabPane',
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
              labelAlign: 'top'
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
