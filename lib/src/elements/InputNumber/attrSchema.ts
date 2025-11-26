import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '计数器',
    props: {
      min: 1,
      max: 999,
      step: 1,
      controlsPosition: ''
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
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              props: {
                autocomplete: 'new-password'
              },
              designKey: 'design-placeholder'
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
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-readonly'
            },
            {
              label: '按钮位置',
              name: 'props.controlsPosition',
              component: 'Radio',
              props: {
                mode: 'static',
                options: [
                  { label: '两侧', value: '' },
                  { label: '内部', value: 'right' }
                ]
              },
              initialValue: '',
              designKey: 'design-controlsPosition'
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
                min: 1,
                controlsPosition: ''
              },
              designKey: 'design-step'
            },
            {
              label: '精度',
              name: 'props.precision',
              component: 'InputNumber',
              props: {
                min: 0,
                controlsPosition: ''
              },
              designKey: 'design-precision',
              help: '数值精度，小数点后保留几位'
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
              labelAlign: 'top',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change'
            },
            {
              label: '失去焦点时 (blur)',
              labelAlign: 'top',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              designKey: 'design-event-blur'
            },
            {
              label: '获得焦点时 (focus)',
              labelAlign: 'top',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              designKey: 'design-event-focus'
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
