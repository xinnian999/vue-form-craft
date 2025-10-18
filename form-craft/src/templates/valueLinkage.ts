import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '字段1',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      name: 'item1',
      change: [
        {
          target: 'item2',
          value: '{{ $values.item1 * 2 + "" }}'
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
      name: 'item2'
    },
    {
      label: '字段3',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      name: 'item3'
    }
  ]
} satisfies FormSchema
