import type { FormSchema } from 'form-craft'

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
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      designKey: 'design-wUHG',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-1',
          children: [
            {
              label: 'label宽度',
              name: 'labelWidth',
              component: 'InputNumber',
              props: {
                min: 60,
                unit: 'px',
                step: 10,
                controlsPosition: ''
              },
              designKey: 'design-cOkn'
            },
            {
              label: 'label对齐方式',
              name: 'labelAlign',
              component: 'Radio',
              props: {
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
              designKey: 'design-YJOL'
            },
            {
              label: 'label后缀',
              name: 'labelSuffix',
              component: 'Input',
              designKey: 'design-OQec'
            },
            {
              label: '表单组件尺寸',
              name: 'size',
              component: 'Radio',
              props: {
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
              designKey: 'design-d74u'
            },
            {
              label: '表单初始值',
              name: 'initialValues',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-InitialValues'
              },
              designKey: 'design-2Saj'
            },
            {
              label: '禁用表单',
              name: 'disabled',
              component: 'Switch',
              designKey: 'design-jItQ'
            },
            {
              label: '隐藏必填星号',
              name: 'hideRequiredAsterisk',
              component: 'Switch',
              designKey: 'design-Ys1j'
            },
            {
              label: '自动滚动到校验失败的第一项',
              name: 'scrollToError',
              component: 'Switch',
              designKey: 'design-6meZ',
              labelAlign: 'top'
            },
            {
              label: '表单提交按钮',
              name: 'submitBtn',
              component: 'Switch',
              designKey: 'design-sHY1'
            },
            {
              label: '表单重置按钮',
              name: 'resetBtn',
              component: 'Switch',
              designKey: 'design-1weX'
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
          designKey: 'tab-5',
          children: [
            {
              label: '表单数据变化时（change）',
              name: 'onChange',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: [{ name: 'values', description: '当前表单数据' }]
              },
              designKey: 'design-event-change'
            },
            {
              label: '表单提交成功时（finish）',
              name: 'onFinish',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: [{ name: 'values', description: '提交成功时的表单数据' }]
              },
              designKey: 'design-event-finish'
            },
            {
              label: '表单提交失败时（failed）',
              name: 'onFailed',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: [{ name: 'error', description: '校验失败的错误对象' }]
              },
              designKey: 'design-event-failed'
            },
            {
              label: '表单重置时（reset）',
              name: 'onReset',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: []
              },
              designKey: 'design-event-reset'
            },
            {
              label: '字段数据改变时（fieldChange）',
              name: 'onFieldChange',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: [
                  { name: 'path', description: '字段路径' },
                  { name: 'value', description: '字段新值' }
                ]
              },
              designKey: 'design-event-field-change'
            },
            {
              label: '表单验证时（validate）',
              name: 'onValidate',
              component: 'FunctionEditor',
              labelAlign: 'top',
              props: {
                paramTips: [
                  { name: 'prop', description: '被校验的表单项字段名' },
                  { name: 'isValid', description: '该项是否校验通过' },
                  { name: 'message', description: '校验消息' }
                ]
              },
              designKey: 'design-event-validate'
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
          designKey: 'tab-6',
          children: [
            {
              label: '',
              name: 'style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              designKey: 'design-KaWx',
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
