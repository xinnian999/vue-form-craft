import type { FormSchema } from "@vue-form-craft/types";

export default {
  size: 'small',
  labelAlign: 'top',
  initialValues: {
    label: '日期选择器',
    props: {
      type: 'datetime',
      placeholder: '请选择日期',
      clearable: false
    },
  },
  items: [
    { label: '标签', component: 'Input', name: 'label' },
    {
      label: '唯一标识',
      component: 'Input',
      name: 'name',
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'Textarea', name: 'help' },
    {
      label: '占位提示',
      component: 'Input',
      name: 'props.placeholder',
      designKey: 'form-ekRL'
    },
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
        { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
      ],
      props: {
        columns: 3,
        'row-gap': 0,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    },
    {
      label: '类型',
      component: 'Radio',
      name: 'props.type',
      props: {
        mode: 'static',
        options: [
          { label: '日期时间', value: 'datetime' },
          { label: '日期', value: 'date' },
          { label: '年月', value: 'month' },
          { label: '日期范围', value: 'daterange' },
          { label: '日期时间范围', value: 'datetimerange' }
        ]
      }
    },
    

  ]
} satisfies FormSchema
