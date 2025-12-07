import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    label: '日期选择器',
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
      designKey: 'design-tabs',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-attrs',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              designKey: 'design-basic',
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              designKey: 'design-disabled'
            },
            {
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              designKey: 'design-placeholder'
            },
            {
              label: '开始时间-占位提示',
              labelAlign: 'top',
              name: 'props.startPlaceholder',
              component: 'Input',
              hidden: '{{ !$values.props.type.includes("range") }}',
              designKey: 'design-start-placeholder'
            },
            {
              label: '结束时间-占位提示',
              labelAlign: 'top',
              name: 'props.endPlaceholder',
              component: 'Input',
              hidden: '{{ !$values.props.type.includes("range") }}',
              designKey: 'design-end-placeholder'
            },
            {
              label: '显示清除按钮',
              name: 'props.clearable',
              component: 'Switch',
              designKey: 'design-clearable'
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
              },
              designKey: 'design-type'
            },
            {
              label: '值格式',
              name: 'props.value-format',
              component: 'Input',
              props: {
                placeholder: 'YYYY-MM-DD HH:mm:ss'
              },
              designKey: 'design-value-format',
              help: '绑定值的格式，不指定则绑定值为 Date 对象'
            },
            {
              label: '显示格式',
              name: 'props.format',
              component: 'Input',
              props: {
                placeholder: 'YYYY-MM-DD HH:mm:ss'
              },
              designKey: 'design-format',
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
          designKey: 'tab-rules',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Rules'
              },
              designKey: 'design-KaWx11',
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
          designKey: 'tab-linkages',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Linkages'
              },
              designKey: 'design-linkages-custom',
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
          designKey: 'tab-events',
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change',
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
          designKey: 'tab-style',
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              designKey: 'design-style',
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
