import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
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
              label: '选择模式',
              name: 'componentProps.multiple',
              component: 'Switch',
              componentProps: {
                activeText: '多选',
                inactiveText: '单选'
              }
      }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          component: 'TabPane',
          items: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Options'
              },
              labelWidth: 0
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
              name: 'componentProps.onChange',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '失去焦点时 (blur)',
              name: 'componentProps.onBlur',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '获得焦点时 (focus)',
              name: 'componentProps.onFocus',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '输入时 (input)',
              name: 'componentProps.onInput',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '清空时 (clear)',
              name: 'componentProps.onClear',
              component: 'FunctionEditor',
              labelAlign: 'top'
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
