import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ],
      placeholder: '请选择...'
    }
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
              label: '选择模式',
              name: 'props.multiple',
              component: 'Switch',
              props: {
                activeText: '多选',
                inactiveText: '单选'
              }
      }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          component: 'TabPane',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Options'
              },
              labelWidth: 0
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
            },
            {
              label: '失去焦点时 (blur)',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '获得焦点时 (focus)',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '输入时 (input)',
              name: 'props.onInput',
              component: 'FunctionEditor',
              labelAlign: 'top'
            },
            {
              label: '清空时 (clear)',
              name: 'props.onClear',
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
