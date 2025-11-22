import type { FormSchema } from 'form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '开关',
    props: {
      'inline-prompt': false
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
              label: 'ID',
              name: 'id',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password'
              },
              designKey: 'design-id'
            },
            {
              label: 'class',
              name: 'class',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password'
              },
              designKey: 'design-class'
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
              label: '打开时描述',
              name: 'props.active-text',
              component: 'Input',
              props: {
                clearable: true
              },
              designKey: 'design-active-text'
            },
            {
              label: '关闭时描述',
              name: 'props.inactive-text',
              component: 'Input',
              props: {
                clearable: true
              },
              designKey: 'design-inactive-text'
            },
            {
              label: '描述显示位置',
              name: 'props.inline-prompt',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '外部',
                    value: false
                  },
                  {
                    label: '内部',
                    value: true
                  }
                ]
              },
              designKey: 'design-inline-prompt'
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
              label: '必填',
              name: 'required',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-required'
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
          designKey: 'tab-events',
          children: [
            {
              label: '数据改变时 (change)',
              labelAlign: 'top',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change'
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
