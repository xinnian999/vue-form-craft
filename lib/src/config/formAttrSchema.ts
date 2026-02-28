import type { FormSchema } from 'vue-form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {},
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
              label: '标签宽度（px）',
              name: 'labelWidth',
              component: 'InputNumber',
              componentProps: {
                min: 60,
                step: 10
              },
              defaultValue: 150
            },
            {
              label: 'label对齐方式',
              name: 'labelAlign',
              component: 'Radio',
              componentProps: {
                mode: 'static',
                options: [
                  {
                    label: '左对齐',
                    value: 'left'
                  },
                  {
                    label: '居上',
                    value: 'top'
                  },
                  {
                    label: '右对齐',
                    value: 'right'
                  }
                ]
              },
              defaultValue: 'right'
            },
            {
              label: '表单组件尺寸',
              name: 'size',
              component: 'Radio',
              componentProps: {
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
              defaultValue: 'default'
            },
            {
              label: '表单初始值',
              name: 'initialValues',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-InitialValues'
              }
            },
            {
              label: '全局样式',
              name: 'styleBlock',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-GlobalStyle'
              }
            },
            {
              label: '禁用表单',
              name: 'disabled',
              component: 'Switch'
            },
            {
              label: '显示冒号',
              name: 'colon',
              component: 'Switch'
            },
            {
              label: '隐藏必填星号',
              name: 'hideRequiredAsterisk',
              component: 'Switch'
            },
            {
              label: '自动滚动到校验失败的第一项',
              name: 'scrollToError',
              component: 'Switch',
              defaultValue: true,
              labelAlign: 'top'
            },
            {
              label: '表单提交按钮',
              name: 'submitBtn',
              component: 'Switch',
              defaultValue: true
            },
            {
              label: '表单重置按钮',
              name: 'resetBtn',
              component: 'Switch'
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
              label: '表单数据变化时（change）',
              name: 'onChange',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: [{ name: 'values', description: '当前表单数据' }]
              }
            },
            {
              label: '表单提交成功时（finish）',
              name: 'onFinish',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: [{ name: 'values', description: '提交成功时的表单数据' }]
              }
            },
            {
              label: '表单提交失败时（failed）',
              name: 'onFailed',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: [{ name: 'error', description: '校验失败的错误对象' }]
              }
            },
            {
              label: '表单重置时（reset）',
              name: 'onReset',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: []
              }
            },
            {
              label: '字段数据改变时（fieldChange）',
              name: 'onFieldChange',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: [
                  { name: 'path', description: '字段路径' },
                  { name: 'value', description: '字段新值' }
                ]
              }
            },
            {
              label: '表单验证时（validate）',
              name: 'onValidate',
              component: 'FunctionEditor',
              labelAlign: 'top',
              componentProps: {
                paramTips: [
                  { name: 'prop', description: '被校验的表单项字段名' },
                  { name: 'isValid', description: '该项是否校验通过' },
                  { name: 'message', description: '校验消息' }
                ]
              }
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
              name: 'style',
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
