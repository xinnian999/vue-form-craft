import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  items: [
    {
      label: '必填',
      name: 'required',
      component: 'Switch',
      componentProps: {
        'inline-prompt': false
      }
    },
    {
      // label: '校验规则',
      name: 'rules',
      component: 'FormList',
      componentProps: {
        mode: 'card',
        title: '校验规则'
      },
      // labelAlign: 'top',
      items: [
        {
          label: '规则类型',
          name: 'type',
          component: 'Select',
          componentProps: {
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
          linkages: [
            {
              target: 'rules.*.value',
              type: 'data',
              value: ''
            }
          ]
        },
        {
          label: '最小值',
          name: 'value',
          component: 'InputNumber',
          componentProps: {
            min: 0
          },
          when: "{{ $item.type === 'min' }}"
        },
        {
          label: '最大值',
          name: 'value',
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入最大长度',
            min: 0
          },
          when: "{{ $item.type === 'max' }}"
        },
        {
          label: '正则表达式',
          name: 'value',
          component: 'Input',
          componentProps: {
            placeholder: '可根据【错误提示】ai生成',
            aiPrompt:
              '根据字段「{{$item.message || $values.label || "该字段"}}」的含义，生成一个合适的 JS 正则表达式字符串，不要加 / 包裹，只返回纯正则字符串。'
          },
          labelAlign: 'top',
          when: "{{ $item.type === 'pattern' }}",
          help: '输入正则表达式字符串，不需要包含斜杠'
        },
        {
          label: '内置类型',
          name: 'value',
          component: 'Select',
          componentProps: {
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
          when: "{{ $item.type === 'builtin' }}",
          help: '使用 async-validator 内置类型校验'
        },
        {
          label: '枚举值',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            placeholder: '请输入枚举值，每行一个',
            autosize: {
              minRows: 3,
              maxRows: 6
            }
          },
          when: "{{ $item.type === 'enum' }}",
          help: '每行输入一个可选值'
        },
        {
          label: '自定义函数体',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            placeholder:
              'if (value.length < 6) {\n  callback(new Error("长度不足"));\n} else {\n  callback();\n}',
            autosize: {
              minRows: 4,
              maxRows: 10
            }
          },
          when: "{{ $item.type === 'custom' }}",
          help: '函数参数：rule, value, callback'
        },
        {
          label: 'JS表达式',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            autosize: {
              minRows: 2,
              maxRows: 6
            }
          },
          when: "{{ $item.type === 'jsExpr' }}",
          help: '使用 {{ }} 包裹表达式，返回布尔值'
        },
        {
          label: '错误提示',
          name: 'message',
          component: 'Input',
          componentProps: {
            placeholder: '请输入校验失败时的提示信息'
          }
        },
        {
          label: '触发时机',
          name: 'trigger',
          component: 'Radio',
          componentProps: {
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
          }
        }
      ]
    }
  ]
} satisfies FormSchema
