import type { FormSchema } from 'vue-form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
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
              label: '占位提示',
              name: 'componentProps.placeholder',
              component: 'Input',
              componentProps: {
                autocomplete: 'new-password'
              }
            },
            {
              label: 'AI生成',
              name: 'componentProps.aiPrompt',
              component: 'TextArea',
              componentProps: {
                placeholder: '请输入AI生成提示词',
                autosize: true
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
