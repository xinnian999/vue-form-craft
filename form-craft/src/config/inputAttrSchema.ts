import type { FormSchema } from '@/types'
import { validationRulesSchema } from './validationRulesSchema'

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
          children: validationRulesSchema
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
                  help: '请输入 JS 表达式，当结果为 true 时才触发联动',
                  designKey: 'design-link-condition'
                },
                {
                  label: '修改类型',
                  name: 'type',
                  component: 'Radio',
                  initialValue: 'config',
                  props: {
                    mode: 'static',
                    optionType: 'button',
                    options: [
                      { label: '修改配置', value: 'config' },
                      { label: '修改数据', value: 'data' }
                    ]
                  },
                  designKey: 'design-link-type'
                },
                {
                  label: '配置',
                  name: 'path',
                  component: 'Select',
                  props: {
                    placeholder: '请选择要修改的配置属性',
                    clearable: true,
                    mode: 'static',
                    options: [
                      { label: '禁用状态', value: 'props.disabled' },
                      { label: '占位提示', value: 'props.placeholder' },
                      { label: '只读状态', value: 'props.readonly' },
                      { label: '是否可清空', value: 'props.clearable' },
                      { label: '最大长度', value: 'props.maxlength' },
                      { label: '最小值', value: 'props.min' },
                      { label: '最大值', value: 'props.max' },
                      { label: '隐藏字段', value: 'hidden' },
                      { label: '字段标签', value: 'label' },
                      { label: '提示信息', value: 'help' },
                      { label: '隐藏标签', value: 'hideLabel' },
                      { label: '必填', value: 'required' },
                      { label: '自定义', value: 'custom' }
                    ]
                  },
                  hidden: "{{ $item.type !== 'config' }}",
                  designKey: 'design-link-config-attr'
                },
                {
                  label: '自定义路径',
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
                  hidden: "{{ $item.type !== 'config' }}",
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
        }
      ]
    }
  ]
} satisfies FormSchema
