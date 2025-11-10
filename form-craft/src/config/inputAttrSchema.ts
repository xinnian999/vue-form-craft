import type { FormSchema } from '@/types'

export default {
  labelWidth: 110,
  size: 'small',
  labelAlign: 'left',
  scrollToError: true,
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
          designKey: 'tab-1',
          props: {
            lazy: true
          },
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
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
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
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-XgeW'
            },
            {
              label: '清除按钮',
              name: 'props.clearable',
              component: 'Switch',
              designKey: 'design-8sk2'
            },
            {
              label: '浏览器自动填充',
              name: 'props.autocomplete',
              component: 'Switch',
              props: {
                activeValue: 'on',
                inactiveValue: 'new-password'
              },
              designKey: 'design-BU53'
            }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          component: 'TabPane',
          designKey: 'tab-2',
          props: {
            lazy: true
          },
          children: [
            {
              label: '校验规则',
              component: 'FormList',
              name: 'rules',
              labelAlign: 'top',
              designKey: 'design-rules',
              props: {
                mode: 'card',
                title: '规则'
              },
              children: [
                {
                  label: '规则类型',
                  name: 'type',
                  component: 'Select',
                  props: {
                    placeholder: '请选择规则类型',
                    mode: 'static',
                    options: [
                      { label: '必填', value: 'required' },
                      { label: '最小长度', value: 'min' },
                      { label: '最大长度', value: 'max' },
                      { label: '正则表达式', value: 'pattern' },
                      { label: '内置类型', value: 'builtin' },
                      { label: '枚举值', value: 'enum' },
                      { label: '自定义函数', value: 'custom' },
                      { label: 'JS表达式', value: 'jsExpr' }
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
                  hidden: "{{ $item.type !== 'min' }}",
                  designKey: 'design-rule-min'
                },
                {
                  label: '最大值',
                  name: 'value',
                  component: 'InputNumber',
                  props: {
                    placeholder: '请输入最大长度',
                    min: 0
                  },
                  hidden: "{{ $item.type !== 'max' }}",
                  designKey: 'design-rule-max'
                },
                {
                  label: '正则表达式',
                  name: 'value',
                  component: 'Autocomplete',
                  props: {
                    placeholder: '请输入正则表达式，如：^[0-9]+$',
                    options: [
                      { label: '邮箱', value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
                      { label: '手机号', value: '^1[3-9]\\d{9}$' },
                      { label: 'QQ号', value: '^[1-9][0-9]{4,10}$' },
                      {
                        label: '身份证号',
                        value:
                          '^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[\\dxX]$'
                      },
                      { label: '中文', value: '^[\u4e00-\u9fa5]+$' },
                      {
                        label: '网址',
                        value: '^http(s)?:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?'
                      },
                      {
                        label: 'IP地址',
                        value:
                          '^(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$'
                      },
                      { label: '邮政编码', value: '^[1-9]\\d{5}$' },
                      { label: '字母+数字', value: '^[a-zA-Z0-9]+$' }
                    ]
                  },
                  hidden: "{{ $item.type !== 'pattern' }}",
                  help: '输入正则表达式字符串，不需要包含斜杠',
                  designKey: 'design-rule-pattern'
                },
                {
                  label: '内置类型',
                  name: 'value',
                  component: 'Select',
                  props: {
                    placeholder: '请选择内置类型',
                    mode: 'static',
                    options: [
                      { label: '字符串', value: 'string' },
                      { label: '数字', value: 'number' },
                      { label: '布尔值', value: 'boolean' },
                      { label: '方法', value: 'method' },
                      { label: '正则', value: 'regexp' },
                      { label: '整数', value: 'integer' },
                      { label: '浮点数', value: 'float' },
                      { label: '数组', value: 'array' },
                      { label: '对象', value: 'object' },
                      { label: '枚举', value: 'enum' },
                      { label: '日期', value: 'date' },
                      { label: 'URL', value: 'url' },
                      { label: '十六进制', value: 'hex' },
                      { label: '邮箱', value: 'email' },
                      { label: '任意类型', value: 'any' }
                    ]
                  },
                  hidden: "{{ $item.type !== 'builtin' }}",
                  help: '使用 async-validator 内置类型校验',
                  designKey: 'design-rule-builtin'
                },
                {
                  label: '枚举值',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    placeholder: '请输入枚举值，每行一个',
                    autosize: { minRows: 3, maxRows: 6 }
                  },
                  hidden: "{{ $item.type !== 'enum' }}",
                  help: '每行输入一个可选值',
                  designKey: 'design-rule-enum'
                },
                {
                  label: '自定义函数体',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    placeholder:
                      'if (value.length < 6) {\n  callback(new Error("长度不足"));\n} else {\n  callback();\n}',
                    autosize: { minRows: 4, maxRows: 10 }
                  },
                  hidden: "{{ $item.type !== 'custom' }}",
                  help: '函数参数：rule, value, callback',
                  designKey: 'design-rule-custom'
                },
                {
                  label: 'JS表达式',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    autosize: { minRows: 2, maxRows: 6 }
                  },
                  hidden: "{{ $item.type !== 'jsExpr' }}",
                  help: '使用 {{ }} 包裹表达式，返回布尔值',
                  designKey: 'design-rule-jsexpr'
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
                      { label: '失焦时', value: 'blur' },
                      { label: '输入时', value: 'change' }
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
          designKey: 'tab-3',
          props: {
            lazy: true
          },
          children: [
            {
              label: '联动规则',
              name: 'linkages',
              component: 'FormList',
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
                    autosize: { minRows: 2, maxRows: 4 },
                    clearable: true
                  },
                  help: '请输入 JS 表达式，当结果为 true 时才触发联动。<br/> 不设置会一直触发',
                  designKey: 'design-link-condition'
                },
                {
                  label: '修改类型',
                  name: 'type',
                  component: 'Radio',
                  initialValue: 'attr',
                  props: {
                    mode: 'static',
                    optionType: 'button',
                    options: [
                      { label: '修改属性', value: 'attr' },
                      { label: '修改数据', value: 'data' }
                    ]
                  },
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
                  ],
                  designKey: 'design-link-type'
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
                      { label: '禁用状态', value: 'props.disabled' },
                      { label: '隐藏状态', value: 'hidden' },
                      { label: '必填状态', value: 'required' },
                      { label: '自定义', value: 'custom' }
                    ]
                  },
                  hidden: "{{ $item.type !== 'attr' }}",
                  designKey: 'design-link-config-attr'
                },
                {
                  label: '自定义属性',
                  name: 'customPath',
                  component: 'Input',
                  props: {
                    clearable: true
                  },
                  hidden: "{{  $item.path !== 'custom' }}",
                  designKey: 'design-link-custom-path'
                },
                {
                  label: '值',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    autosize: { minRows: 2, maxRows: 4 },
                    clearable: true
                  },
                  designKey: 'design-link-config-value'
                }
              ],
              props: {
                mode: 'card',
                title: '联动规则'
              }
            }
          ]
        },
        {
          label: '布局',
          name: 'name4',
          component: 'TabPane',
          designKey: 'tab-4',
          props: {
            lazy: true
          },
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
          label: '事件',
          name: 'events',
          component: 'TabPane',
          designKey: 'tab-5',
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change'
            },
            {
              label: '失去焦点时',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              designKey: 'design-event-blur'
            },
            {
              label: '获得焦点时',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              designKey: 'design-event-focus'
            },
            {
              label: '输入时',
              name: 'props.onInput',
              component: 'FunctionEditor',
              designKey: 'design-event-input'
            },
            {
              label: '清空时',
              name: 'props.onClear',
              component: 'FunctionEditor',
              designKey: 'design-event-clear'
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
