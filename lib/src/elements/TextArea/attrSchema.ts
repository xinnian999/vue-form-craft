import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
      placeholder: '请输入...',
      autosize: {
        minRows: 4,
        maxRows: 999
      }
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
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              props: {
                autocomplete: 'new-password'
              }
      },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch'
      },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch'
      },
            {
              label: '清除按钮',
              name: 'props.clearable',
              component: 'Switch'
      },
            {
              label: '最长字数',
              name: 'props.maxlength',
              component: 'InputNumber',
              props: {
                min: 0
              }
      },
            {
              label: '自适应文本行数',
              name: 'props.autosize',
              component: 'Switch'
      },
            {
              label: '最小行数',
              name: 'props.autosize.minRows',
              component: 'InputNumber',
              props: {
                min: 1
              }
      },
            {
              label: '最大行数',
              name: 'props.autosize.maxRows',
              component: 'InputNumber',
              props: {
                min: 1
              }
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
              labelAlign: 'top',
              name: 'props.onChange',
              component: 'FunctionEditor'
      },
            {
              label: '失去焦点时 (blur)',
              labelAlign: 'top',
              name: 'props.onBlur',
              component: 'FunctionEditor'
      },
            {
              label: '获得焦点时 (focus)',
              labelAlign: 'top',
              name: 'props.onFocus',
              component: 'FunctionEditor'
      },
            {
              label: '输入时 (input)',
              labelAlign: 'top',
              name: 'props.onInput',
              component: 'FunctionEditor'
      },
            {
              label: '清空时 (clear)',
              labelAlign: 'top',
              name: 'props.onClear',
              component: 'FunctionEditor'
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
