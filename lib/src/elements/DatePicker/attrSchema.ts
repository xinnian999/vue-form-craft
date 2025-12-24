import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
      type: 'date'
    }
  },
  items: [
    {
      name: 'form-tabs',
      component: 'Tabs',
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch'
      },
            {
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input'
      },
            {
              label: '开始时间-占位提示',
              labelAlign: 'top',
              name: 'props.startPlaceholder',
              component: 'Input',
              hidden: '{{ !$values.props.type.includes("range") }}'
      },
            {
              label: '结束时间-占位提示',
              labelAlign: 'top',
              name: 'props.endPlaceholder',
              component: 'Input',
              hidden: '{{ !$values.props.type.includes("range") }}'
      },
            {
              label: '显示清除按钮',
              name: 'props.clearable',
              component: 'Switch'
      },
            {
              label: '类型',
              name: 'props.type',
              component: 'Select',
              props: {
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
              name: 'props.value-format',
              component: 'Input',
              props: {
                placeholder: 'YYYY-MM-DD HH:mm:ss'
              },
              help: '绑定值的格式，不指定则绑定值为 Date 对象'
            },
            {
              label: '显示格式',
              name: 'props.format',
              component: 'Input',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              labelAlign: 'top'
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
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
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
