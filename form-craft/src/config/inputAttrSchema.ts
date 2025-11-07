import type { FormSchema } from 'form-craft'

export default {
  labelWidth: 150,
  size: 'small',
  labelAlign: 'left',
  scrollToError: true,
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
          designKey: 'tab-1',
          children: [
            {
              name: 'form-ITGD',
              component: 'Divider',
              props: {
                title: '字段配置',
                contentPosition: 'center'
              },
              designKey: 'design-NXEJ'
            },
            {
              label: '标签',
              name: 'label',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password',
                clearable: true
              },
              designKey: 'design-gfim'
            },
            {
              label: '字段标识',
              name: 'name',
              component: 'Input',
              props: {
                placeholder: '',
                autocomplete: 'new-password',
                clearable: true
              },
              designKey: 'design-njXF'
            },
            {
              label: '气泡提示',
              name: 'help',
              component: 'TextArea',
              props: {
                placeholder: '',
                autosize: {
                  minRows: 2,
                  maxRows: 999
                },
                clearable: true
              },
              designKey: 'design-Qh45'
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
              label: '隐藏',
              name: 'hidden',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-C5Qj'
            },
            {
              name: 'form-IH6q',
              component: 'Divider',
              props: {
                title: '组件配置',
                contentPosition: 'center'
              },
              designKey: 'design-R9lS'
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-VnLN'
            },
            {
              label: '只读',
              name: 'props.readonly',
              component: 'Switch',
              props: {
                'inline-prompt': false
              },
              designKey: 'design-XgeW'
            }
          ]
        },
        {
          label: '校验',
          name: 'name2',
          component: 'TabPane',
          designKey: 'tab-2',
          children: []
        }
      ]
    }
  ]
} satisfies FormSchema
