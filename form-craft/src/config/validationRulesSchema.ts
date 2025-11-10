import type { FormItemType } from '@/types'

/**
 * 通用的校验规则配置 Schema
 * 可被所有需要校验的组件复用
 */
export const validationRulesSchema: FormItemType[] = [
  //   {
  //     label: '必填',
  //     name: 'rules[0].required',
  //     component: 'Switch',
  //     designKey: 'design-required'
  //   },
  //   {
  //     label: '必填提示语',
  //     name: 'rules[0].message',
  //     component: 'Input',
  //     designKey: 'design-required-message',
  //     hidden: '{{ $values.rules[0].required !== true }}'
  //   },
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
