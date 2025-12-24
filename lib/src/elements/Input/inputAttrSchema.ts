import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
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
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              designKey: 'design-KaWx111111'
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              designKey: 'design-VnLN'
            },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              designKey: 'design-XgeW'
            },
            {
              label: '清除按钮',
              name: 'props.clearable',
              component: 'Switch',
              designKey: 'design-8sk2'
            },
            {
              label: '占位提示',
              name: 'props.placeholder',
              component: 'Input',
              props: {
                autocomplete: 'new-password'
              },
              designKey: 'design-JTMu'
            },
            {
              label: 'AI生成',
              name: 'props.aiPrompt',
              component: 'TextArea',
              props: {
                placeholder: '请输入AI生成提示词',
                autosize: true
              },
              designKey: 'design-aiPrompt'
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
          designKey: 'tab-2',
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
          designKey: 'tab-3',
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
          designKey: 'tab-5',
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change',
              labelAlign: 'top'
            },
            {
              label: '失去焦点时 (blur)',
              name: 'props.onBlur',
              component: 'FunctionEditor',
              designKey: 'design-event-blur',
              labelAlign: 'top'
            },
            {
              label: '获得焦点时 (focus)',
              name: 'props.onFocus',
              component: 'FunctionEditor',
              designKey: 'design-event-focus',
              labelAlign: 'top'
            },
            {
              label: '输入时 (input)',
              name: 'props.onInput',
              component: 'FunctionEditor',
              designKey: 'design-event-input',
              labelAlign: 'top'
            },
            {
              label: '清空时 (clear)',
              name: 'props.onClear',
              component: 'FunctionEditor',
              designKey: 'design-event-clear',
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
          designKey: 'tab-6',
          children: [
            {
              label: '',
              name: 'props.style',
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
