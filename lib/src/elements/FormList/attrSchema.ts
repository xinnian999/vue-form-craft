import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'top',
  scrollToError: true,
  size: 'small',
  submitBtn: true,
  initialValues: {
    children: [],
    props: {
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
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    {
      label: '字段说明',
      name: 'help',
      component: 'TextArea'
    },
    {
      label: '占位提示',
      name: 'props.placeholder',
      component: 'Input'
    },
    {
      name: 'cNmCuu',
      component: 'Grid',
      props: {
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
          name: 'props.disabled',
          component: 'Switch'
        },
        {
          label: '隐藏字段',
          name: 'hidden',
          component: 'Switch'
        }
      ]
    },
    {
      label: '显示模式',
      name: 'props.mode',
      component: 'Radio',
      props: {
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
      name: 'props.title',
      component: 'Input'
    },
    {
      label: '最小行数',
      name: 'props.minLines',
      component: 'InputNumber'
    },
    {
      label: '最大行数',
      name: 'props.maxLines',
      component: 'InputNumber'
    },
    {
      label: '允许新增行',
      name: 'props.allowAdd',
      component: 'Switch'
    },
    {
      label: '允许删除行',
      name: 'props.allowReduce',
      component: 'Switch'
    },
    {
      label: '新增行的初始数据',
      name: 'props.getNewItem',
      component: 'FunctionEditor',
      props: {
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
