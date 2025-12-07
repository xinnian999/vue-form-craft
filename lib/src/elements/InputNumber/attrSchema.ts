import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
      min: 1,
      max: 999,
      step: 1
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
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              designKey: 'design-disabled'
            },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              designKey: 'design-readonly'
            },
            {
              label: '最小值',
              name: 'props.min',
              component: 'InputNumber',
              designKey: 'design-min'
            },
            {
              label: '最大值',
              name: 'props.max',
              component: 'InputNumber',
              designKey: 'design-max'
            },
            {
              label: '步长',
              name: 'props.step',
              component: 'InputNumber',
              props: {
                min: 1
              },
              designKey: 'design-step'
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
