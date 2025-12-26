import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      max: 5
    }
  },
  items: [
    {
      name: 'form-tabs',
      component: 'Tabs',
      componentProps: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'componentProps.disabled',
              component: 'Switch'
      },
            {
              label: '最大分值',
              name: 'componentProps.max',
              component: 'InputNumber',
              componentProps: {
                min: 1,
                max: 10
              }
      },
            {
              label: '允许半选',
              name: 'componentProps.allowHalf',
              component: 'Switch'
      }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Rules'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              label: '联动规则',
              name: 'linkages',
              component: 'FormList',
              componentProps: {
                mode: 'card',
                title: '规则'
              },
              labelAlign: 'top',
              children: [
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
                  }
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
                    min: 0
                  },
                  when: "{{ $item.type === 'max' }}"
                },
                {
                  label: '自定义函数体',
                  name: 'value',
                  component: 'TextArea',
                  componentProps: {
                    placeholder:
                      'if (value < 3) {\n  callback(new Error("评分不能低于3分"));\n} else {\n  callback();\n}',
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
        },
        {
          label: '联动',
          name: 'linkages',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Linkages'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '事件',
          name: 'events',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              name: 'componentProps.onChange',
              component: 'FunctionEditor',
              labelAlign: 'top'
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              label: '',
              name: 'componentProps.style',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-StyleEditor'
              },
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
