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
        title: '联动规则',
        getNewItem: '{{ () => { return { type: "attr"} } }}'
      },
      labelAlign: 'top',
      children: [
        {
          label: '目标字段',
          name: 'target',
          component: 'Select',
          props: {
            clearable: true,
            mode: 'static',
            options: '{{ nodeOptions }}'
          }
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
          help: '请输入 JS 表达式，当结果为 true 时才触发联动。<br/> 不设置会一直触发'
        },
        {
          label: '修改类型',
          name: 'type',
          component: 'Radio',
          props: {
            mode: 'static',
            type: 'button',
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
                label: '可见状态',
                value: 'show'
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
          hidden: "{{ $item.type !== 'attr' }}"
        },
        {
          label: '自定义属性',
          name: 'customPath',
          component: 'Input',
          props: {
            clearable: true
          },
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
          hidden: "{{ $item.type !== 'data' }}"
      },
        {
          label: '隐藏状态',
          name: 'value',
          component: 'Radio',
          props: {
            options: [
              { label: '隐藏', value: true },
              { label: '不隐藏', value: false }
            ]
          },
          hidden: "{{ $item.path !== 'hidden' }}"
      },
        {
          label: '可见状态',
          name: 'value',
          component: 'Radio',
          props: {
            options: [
              { label: '可见', value: true },
              { label: '不可见', value: false }
            ]
          },
          hidden: '{{ $item.path !== "show" }}'
      },
        {
          label: '禁用状态',
          name: 'value',
          component: 'Radio',
          props: {
            options: [
              { label: '禁用', value: true },
              { label: '不禁用', value: false }
            ]
          },
          hidden: '{{ $item.path !== "props.disabled" }}'
      },
        {
          label: '必填状态',
          name: 'value',
          component: 'Radio',
          props: {
            options: [
              { label: '必填', value: true },
              { label: '非必填', value: false }
            ]
          },
          hidden: "{{ $item.path !== 'required' }}"
      },
        {
          label: '提示',
          name: 'value',
          component: 'TextArea',
          props: {
            clearable: true,
            autosize: true
          },
          hidden: "{{ $item.path !== 'alert' }}"
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
          hidden:
            "{{ $item.path === 'show' || $item.path === 'hidden' || $item.path === 'required' || $item.path === 'alert' || $item.path === 'props.disabled' || $item.type !== 'attr' }}"
      }
      ]
    }
  ]
} satisfies FormSchema
