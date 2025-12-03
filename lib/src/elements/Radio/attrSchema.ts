import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '单选框组',
    props: {
      mode: 'static',
      options: [
        {
          label: '选项1',
          value: 'value1'
        },
        {
          label: '选项2',
          value: 'value2'
        },
        {
          label: '选项3',
          value: 'value3'
        }
      ],
      optionType: 'circle',
      direction: 'horizontal',
      space: 20
    }
  },
  items: [
    {
      name: 'form-tabs',
      designKey: 'design-tabs',
      component: 'Tabs',
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          designKey: 'tab-attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-basic',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '隐藏',
              name: 'hidden',
              designKey: 'design-hidden',
              component: 'Switch',
              props: {
                'inline-prompt': false
              }
            },
            {
              label: '禁用',
              name: 'props.disabled',
              designKey: 'design-disabled',
              component: 'Switch',
              props: {
                'inline-prompt': false
              }
            },
            {
              label: '选项样式',
              name: 'props.optionType',
              designKey: 'design-optionType',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '无边框',
                    value: 'circle'
                  },
                  {
                    label: '边框',
                    value: 'border'
                  },
                  {
                    label: '按钮',
                    value: 'button'
                  }
                ],
                optionType: 'button',
                space: 0
              }
            },
            {
              label: '排列方向',
              name: 'props.direction',
              designKey: 'design-direction',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  {
                    label: '水平',
                    value: 'horizontal'
                  },
                  {
                    label: '垂直',
                    value: 'vertical'
                  }
                ],
                optionType: 'button',
                space: 0
              }
            },
            {
              label: '选项间距',
              name: 'props.space',
              designKey: 'design-space',
              component: 'InputNumber',
              props: {
                unit: 'px',
                step: 5,
                controlsPosition: ''
              }
            }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          designKey: 'tab-options',
          component: 'TabPane',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Options'
              },
              designKey: 'design-FormDesign-Options',
              labelWidth: 0
            }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          designKey: 'tab-rules',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-KaWx11',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Rules'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          designKey: 'tab-linkages',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              designKey: 'design-linkages-custom',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Linkages'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '事件',
          name: 'events',
          designKey: 'tab-events',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              designKey: 'design-event-change',
              component: 'FunctionEditor',
              labelAlign: 'top'
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          designKey: 'tab-style',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '',
              name: 'props.style',
              designKey: 'design-style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '插槽',
          name: 'slots',
          component: 'TabPane',
          children: [
            {
              label: '选项内容',
              name: 'slots.default',
              designKey: 'design-1W4w',
              component: 'FunctionEditor'
            }
          ],
          designKey: 'tab-7'
        }
      ]
    }
  ]
} satisfies FormSchema
