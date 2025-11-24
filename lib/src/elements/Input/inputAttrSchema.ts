import type { FormSchema } from 'formora'

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
              label: 'AI生成',
              name: 'props.aiPrompt',
              component: 'TextArea',
              props: {
                placeholder: '请输入AI生成提示词',
                autosize: true
              },
              designKey: 'design-aiPrompt'
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
