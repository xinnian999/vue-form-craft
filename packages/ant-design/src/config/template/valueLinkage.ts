import type { FormSchema } from "@form-magic/core";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '字段1',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-NASi',
      name: 'item1',
      change: [
        {
          target: 'item2',
          value: '{{$values.item1 * 2}}'
        },
        {
          target: 'item3',
          value: "{{$values.item1 + '元'}}"
        }
      ]
    },
    {
      label: '字段2',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-Nasd',
      name: 'item2'
    },
    {
      label: '字段3',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-KI1N',
      name: 'item3'
    }
  ]
} satisfies FormSchema
