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
