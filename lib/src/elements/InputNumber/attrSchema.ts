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
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch'
      },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch'
      },
            {
              label: '最小值',
              name: 'props.min',
              component: 'InputNumber'
      },
            {
              label: '最大值',
              name: 'props.max',
              component: 'InputNumber'
      },
            {
              label: '步长',
              name: 'props.step',
              component: 'InputNumber',
              props: {
                min: 1
              }
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
          children: [
            {
              name: '.',
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
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
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
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              labelAlign: 'top',
              name: 'props.onChange',
              component: 'FunctionEditor'
      },
            {
              label: '失去焦点时 (blur)',
              labelAlign: 'top',
              name: 'props.onBlur',
              component: 'FunctionEditor'
      },
            {
              label: '获得焦点时 (focus)',
              labelAlign: 'top',
              name: 'props.onFocus',
              component: 'FunctionEditor'
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
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
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
