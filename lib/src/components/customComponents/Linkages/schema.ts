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
      componentProps: {
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
          componentProps: {
            clearable: true,
            mode: 'static',
            options: '{{ nodeOptions }}'
          }
        },
        {
          label: '触发条件',
          name: 'condition',
          component: 'TextArea',
          componentProps: {
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
          componentProps: {
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
          componentProps: {
            placeholder: '请选择要修改的配置属性',
            clearable: true,
            mode: 'static',
            options: [
              {
                label: '禁用状态',
                value: 'props.disabled'
              },
              {
                label: '渲染状态',
                value: 'when'
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
          when: "{{ $item.type === 'attr' }}"
        },
        {
          label: '自定义属性',
          name: 'customPath',
          component: 'Input',
          componentProps: {
            clearable: true
          },
          when: "{{  $item.path === 'custom' }}"
        },
        {
          label: '值',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            autosize: {
              minRows: 2,
              maxRows: 4
            },
            clearable: true
          },
          when: "{{ $item.type === 'data' }}"
        },
        {
          label: '渲染状态',
          name: 'value',
          component: 'Radio',
          componentProps: {
            options: [
              { label: '渲染', value: true },
              { label: '不渲染', value: false }
            ]
          },
          when: "{{ $item.path === 'when' }}"
        },
        {
          label: '可见状态',
          name: 'value',
          component: 'Radio',
          componentProps: {
            options: [
              { label: '可见', value: true },
              { label: '不可见', value: false }
            ]
          },
          when: '{{ $item.path === "show" }}'
        },
        {
          label: '禁用状态',
          name: 'value',
          component: 'Radio',
          componentProps: {
            options: [
              { label: '禁用', value: true },
              { label: '不禁用', value: false }
            ]
          },
          when: '{{ $item.path === "props.disabled" }}'
        },
        {
          label: '必填状态',
          name: 'value',
          component: 'Radio',
          componentProps: {
            options: [
              { label: '必填', value: true },
              { label: '非必填', value: false }
            ]
          },
          when: "{{ $item.path === 'required' }}"
        },
        {
          label: '提示',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            clearable: true,
            autosize: true
          },
          when: "{{ $item.path === 'alert' }}"
        },
        {
          label: '值',
          name: 'value',
          component: 'TextArea',
          componentProps: {
            autosize: {
              minRows: 2,
              maxRows: 4
            },
            clearable: true
          },
          when: "{{ $item.path !== 'show' && $item.path !== 'when' && $item.path !== 'required' && $item.path !== 'alert' && $item.path !== 'props.disabled' && $item.type === 'attr' }}"
        }
      ]
    }
  ]
} satisfies FormSchema
