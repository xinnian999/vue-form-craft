import type { FormSchema } from '@/types'

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    labelWidth: 150,
    size: 'default',
    labelAlign: 'right'
  },
  items: [
    {
      label: '表单宽度',
      component: 'Input',
      name: 'style.width',
      props: {
        placeholder: '100%'
      }
    },
    {
      label: 'label宽度',
      component: 'InputNumber',
      name: 'labelWidth',
      props: {
        min: 60,
        unit: 'px',
        step: 10
      }
    },
    {
      label: 'label对齐方式',
      component: 'Radio',
      name: 'labelAlign',
      props: {
        mode: 'static',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居上', value: 'top' },
          { label: '右对齐', value: 'right' }
        ]
      }
    },
    {
      label: 'label后缀',
      component: 'Input',
      name: 'labelSuffix'
    },
    {
      label: '表单组件尺寸',
      component: 'Radio',
      name: 'size',
      props: {
        mode: 'static',
        options: [
          { label: '默认', value: 'default' },
          { label: '较小', value: 'small' },
          { label: '较大', value: 'large' }
        ]
      }
    },
    {
      label: '表单初始值',
      component: 'Custom',
      name: 'initialValues',
      props: {
        componentName: 'FormDesign-InitialValues'
      }
    },
    {
      label: '禁用整个表单',
      component: 'Switch',
      name: 'disabled'
    },
    {
      label: '隐藏必填星号',
      component: 'Switch',
      name: 'hideRequiredAsterisk'
    },
    {
      label: '自动滚动到校验失败的第一项',
      component: 'Switch',
      name: 'scrollToError'
    },
    {
      label: '表单提交按钮',
      component: 'Switch',
      name: 'submitBtn'
    },
    {
      label: '表单重置按钮',
      component: 'Switch',
      name: 'resetBtn'
    }
  ]
} satisfies FormSchema
