import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      type: 'date'
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
              label: '禁用',
              name: 'componentProps.disabled',
              component: 'Switch'
            },
            {
              label: '占位提示',
              name: 'componentProps.placeholder',
              component: 'Input'
            },
            {
              label: '开始时间-占位提示',
              labelAlign: 'top',
              name: 'componentProps.startPlaceholder',
              component: 'Input',
              when: '{{ $values.componentProps.type.includes("range") }}'
            },
            {
              label: '结束时间-占位提示',
              labelAlign: 'top',
              name: 'componentProps.endPlaceholder',
              component: 'Input',
              when: '{{ $values.componentProps.type.includes("range") }}'
            },
            {
              label: '显示清除按钮',
              name: 'componentProps.clearable',
              component: 'Switch'
            },
            {
              label: '类型',
              name: 'componentProps.type',
              component: 'Select',
              componentProps: {
                mode: 'static',
                options: [
                  { label: '日期时间', value: 'datetime' },
                  { label: '日期', value: 'date' },
                  { label: '年', value: 'year' },
                  { label: '年月', value: 'month' },
                  { label: '周', value: 'week' },
                  { label: '日期范围', value: 'daterange' },
                  { label: '月份范围', value: 'monthrange' },
                  { label: '日期时间范围', value: 'datetimerange' }
                ]
              }
            },
            {
              label: '值格式',
              name: 'componentProps.value-format',
              component: 'Input',
              componentProps: {
                placeholder: 'YYYY-MM-DD HH:mm:ss'
              },
              help: '绑定值的格式，不指定则绑定值为 Date 对象'
            },
            {
              label: '显示格式',
              name: 'componentProps.format',
              component: 'Input',
              componentProps: {
                placeholder: 'YYYY-MM-DD HH:mm:ss'
              },
              help: '显示在输入框中的格式'
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
              name: 'componentProps.onChange',
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
