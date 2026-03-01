import type { FormSchema } from 'vue-form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      min: 1,
      max: 999,
      step: 1
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
      items: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          items: [
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
              label: '只读',
              name: 'componentProps.readonly',
              component: 'Switch'
      },
            {
              label: '最小值',
              name: 'componentProps.min',
              component: 'InputNumber'
      },
            {
              label: '最大值',
              name: 'componentProps.max',
              component: 'InputNumber'
      },
            {
              label: '步长',
              name: 'componentProps.step',
              component: 'InputNumber',
              componentProps: {
                min: 1
              }
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
          items: [
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
          items: [
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
          items: [
            {
              label: '数据改变时 (change)',
              labelAlign: 'top',
              name: 'componentProps.onChange',
              component: 'FunctionEditor'
      },
            {
              label: '失去焦点时 (blur)',
              labelAlign: 'top',
              name: 'componentProps.onBlur',
              component: 'FunctionEditor'
      },
            {
              label: '获得焦点时 (focus)',
              labelAlign: 'top',
              name: 'componentProps.onFocus',
              component: 'FunctionEditor'
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
          items: [
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
