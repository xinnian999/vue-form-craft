import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'top',
  scrollToError: true,
  size: 'small',
  submitBtn: true,
  initialValues: {
    children: [],
    componentProps: {
      mode: 'table',
      title: '数据',
      minLines: 0,
      maxLines: 999,
      allowAdd: true,
      allowReduce: true
    }
  },
  items: [
    {
      label: '标签',
      name: 'label',
      component: 'Input'
    },
    {
      label: '唯一标识',
      name: 'name',
      component: 'Input',
      help: "既是唯一标识，也是数据路径。比如输入【componentProps.name】，数据就会保存为 { componentProps: { name:'xxx' } }"
    },
    {
      label: '字段说明',
      name: 'help',
      component: 'TextArea'
    },
    {
      label: '占位提示',
      name: 'componentProps.placeholder',
      component: 'Input'
    },
    {
      name: 'cNmCuu',
      component: 'Grid',
      componentProps: {
        columns: 3,
        'row-gap': 20,
        'column-gap': 20
      },
      children: [
        {
          label: '是否必填',
          name: 'required',
          component: 'Switch'
        },
        {
          label: '是否禁用',
          name: 'componentProps.disabled',
          component: 'Switch'
        },
        {
          label: '渲染字段',
          name: 'when',
          component: 'Switch',
          defaultValue: '{{ true }}'
        }
      ]
    },
    {
      label: '显示模式',
      name: 'componentProps.mode',
      component: 'Radio',
      componentProps: {
        mode: 'static',
        options: [
          {
            label: '表格',
            value: 'table'
          },
          {
            label: '卡片',
            value: 'card'
          }
        ]
      }
    },
    {
      label: '自增前缀',
      name: 'componentProps.title',
      component: 'Input'
    },
    {
      label: '最小行数',
      name: 'componentProps.minLines',
      component: 'InputNumber'
    },
    {
      label: '最大行数',
      name: 'componentProps.maxLines',
      component: 'InputNumber'
    },
    {
      label: '允许新增行',
      name: 'componentProps.allowAdd',
      component: 'Switch'
    },
    {
      label: '允许删除行',
      name: 'componentProps.allowReduce',
      component: 'Switch'
    },
    {
      label: '新增行的初始数据',
      name: 'componentProps.getNewItem',
      component: 'FunctionEditor',
      componentProps: {
        paramTips: [
          {
            name: 'index',
            description: '新增行的index'
          }
        ]
      }
    }
  ]
} satisfies FormSchema
