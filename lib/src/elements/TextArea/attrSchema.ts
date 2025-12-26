import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      placeholder: '请输入...',
      autosize: {
        minRows: 4,
        maxRows: 999
      }
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
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '占位提示',
              name: 'componentProps.placeholder',
              component: 'Input',
              componentProps: {
                autocomplete: 'new-password'
              }
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
              label: '清除按钮',
              name: 'componentProps.clearable',
              component: 'Switch'
      },
            {
              label: '最长字数',
              name: 'componentProps.maxlength',
              component: 'InputNumber',
              componentProps: {
                min: 0
              }
      },
            {
              label: '自适应文本行数',
              name: 'componentProps.autosize',
              component: 'Switch'
      },
            {
              label: '最小行数',
              name: 'componentProps.autosize.minRows',
              component: 'InputNumber',
              componentProps: {
                min: 1
              }
      },
            {
              label: '最大行数',
              name: 'componentProps.autosize.maxRows',
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
          children: [
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
          children: [
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
          children: [
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
      },
            {
              label: '输入时 (input)',
              labelAlign: 'top',
              name: 'componentProps.onInput',
              component: 'FunctionEditor'
      },
            {
              label: '清空时 (clear)',
              labelAlign: 'top',
              name: 'componentProps.onClear',
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
          children: [
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
