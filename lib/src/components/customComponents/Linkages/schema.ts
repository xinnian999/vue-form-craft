import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  items: [
    {
      label: '联动规则',
      name: 'linkages',
      component: 'FormList',
      props: {
        mode: 'card',
        title: '联动规则'
      },
      designKey: 'design-linkages',
      labelAlign: 'top',
      children: [
        {
          label: '目标字段',
          name: 'target',
          component: 'Input',
          props: {
            placeholder: '目标字段的 name',
            clearable: true
          },
          designKey: 'design-link-target'
        },
        {
          label: '触发条件',
          name: 'condition',
          component: 'TextArea',
          props: {
            autosize: {
              minRows: 2,
              maxRows: 4
            },
            clearable: true
          },
          designKey: 'design-link-condition',
          help: '请输入 JS 表达式，当结果为 true 时才触发联动。<br/> 不设置会一直触发'
        },
        {
          label: '修改类型',
          name: 'type',
          component: 'Radio',
          props: {
            mode: 'static',
            optionType: 'button',
            options: [
              {
                label: '修改属性',
                value: 'attr'
              },
              {
                label: '修改数据',
                value: 'data'
              }
            ]
          },
          designKey: 'design-link-type',
          initialValue: 'attr',
          linkages: [
            {
              target: 'path',
              type: 'data',
              condition: "{{ $item.type === 'data' }}",
              value: ''
            },
            {
              target: 'customPath',
              type: 'data',
              condition: "{{ $item.type === 'data' }}",
              value: ''
            }
          ]
        },
        {
          label: '属性',
          name: 'path',
          component: 'Select',
          props: {
            placeholder: '请选择要修改的配置属性',
            clearable: true,
            mode: 'static',
            options: [
              {
                label: '禁用状态',
                value: 'props.disabled'
              },
              {
                label: '隐藏状态',
                value: 'hidden'
              },
              {
                label: '必填状态',
                value: 'required'
              },
              {
                label: '提示',
                value: 'alert'
              },
              {
                label: '自定义',
                value: 'custom'
              }
            ]
          },
          designKey: 'design-link-config-attr',
          hidden: "{{ $item.type !== 'attr' }}"
        },
        {
          label: '自定义属性',
          name: 'customPath',
          component: 'Input',
          props: {
            clearable: true
          },
          designKey: 'design-link-custom-path',
          hidden: "{{  $item.path !== 'custom' }}"
        },
        {
          label: '值',
          name: 'value',
          component: 'TextArea',
          props: {
            autosize: {
              minRows: 2,
              maxRows: 4
            },
            clearable: true
          },
          designKey: 'design-link-config-value'
        }
      ]
    }
  ]
} satisfies FormSchema
