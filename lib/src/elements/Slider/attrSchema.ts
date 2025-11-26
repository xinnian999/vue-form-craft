import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '滑块',
    props: {
      step: 1,
      min: 0,
      max: 100
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
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              designKey: 'design-basic',
              labelWidth: 0
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
              label: '范围选择',
              name: 'props.range',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-range',
              help: '是否为范围选择'
            },
            {
              label: '最小值',
              name: 'props.min',
              component: 'InputNumber',
              props: {
                controlsPosition: ''
              },
              designKey: 'design-min'
            },
            {
              label: '最大值',
              name: 'props.max',
              component: 'InputNumber',
              props: {
                controlsPosition: ''
              },
              designKey: 'design-max'
            },
            {
              label: '步长',
              name: 'props.step',
              component: 'InputNumber',
              props: {
                min: 0,
                controlsPosition: ''
              },
              designKey: 'design-step'
            },
            {
              label: '显示输入框',
              name: 'props.show-input',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-show-input',
              help: '是否显示输入框'
            },
            {
              label: '显示标记',
              name: 'props.show-stops',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-show-stops',
              help: '是否显示间断点'
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
