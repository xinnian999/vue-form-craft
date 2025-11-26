import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '评分',
    props: {
      max: 5
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
              label: '最大分值',
              name: 'props.max',
              component: 'InputNumber',
              props: {
                min: 1,
                max: 10,
                controlsPosition: ''
              },
              designKey: 'design-max'
            },
            {
              label: '允许半选',
              name: 'props.allow-half',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-allow-half'
            },
            {
              label: '显示分数',
              name: 'props.show-score',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-show-score'
            },
            {
              label: '显示文本',
              name: 'props.show-text',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-show-text'
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
              label: '联动规则',
              name: 'linkages',
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
                        label: '最小值',
                        value: 'min'
                      },
                      {
                        label: '最大值',
                        value: 'max'
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
                    placeholder: '请输入最小值',
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
                    placeholder: '请输入最大值',
                    min: 0,
                    controlsPosition: ''
                  },
                  designKey: 'design-rule-max',
                  hidden: "{{ $item.type !== 'max' }}"
                },
                {
                  label: '自定义函数体',
                  name: 'value',
                  component: 'TextArea',
                  props: {
                    placeholder:
                      'if (value < 3) {\n  callback(new Error("评分不能低于3分"));\n} else {\n  callback();\n}',
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
