import type { FormSchema } from 'form-craft'

export default {
  labelWidth: 110,
  size: 'small',
  labelAlign: 'left',
  scrollToError: true,
  submitBtn: false,
  initialValues: {
    label: '单行文本'
  },
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
              designKey: 'design-6meZ'
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
              label: '数据改变时',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change'
            },
            {
              label: '失去焦点时',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              designKey: 'design-event-blur'
            },
            {
              label: '获得焦点时',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              designKey: 'design-event-focus'
            },
            {
              label: '输入时',
              name: 'props.onInput',
              component: 'FunctionEditor',
              designKey: 'design-event-input'
            },
            {
              label: '清空时',
              name: 'props.onClear',
              component: 'FunctionEditor',
              designKey: 'design-event-clear'
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
