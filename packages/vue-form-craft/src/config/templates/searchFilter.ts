import type { FormSchema } from '@vue-form-craft/core'

export default {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '关键词',
      name: 'keyword',
      component: 'Input',
      props: { placeholder: '请输入关键词' },
      designKey: 'design-sf-keyword'
    },
    {
      label: '分类',
      name: 'category',
      component: 'Select',
      props: {
        placeholder: '请选择分类',
        options: [
          { label: '全部', value: '' },
          { label: '电子产品', value: 'electronic' },
          { label: '服饰', value: 'clothes' },
          { label: '日用品', value: 'daily' }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static',
        clearable: true
      },
      designKey: 'design-sf-category'
    },
    {
      label: '时间范围',
      name: 'dateRange',
      component: 'DatePicker',
      props: {
        type: 'daterange',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        clearable: true
      },
      designKey: 'design-sf-daterange'
    },
    {
      label: '状态',
      name: 'status',
      component: 'Select',
      props: {
        placeholder: '请选择状态',
        options: [
          { label: '全部', value: '' },
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
        labelKey: 'label',
        valueKey: 'value',
        mode: 'static',
        clearable: true
      },
      designKey: 'design-sf-status'
    }
  ]
} satisfies FormSchema
