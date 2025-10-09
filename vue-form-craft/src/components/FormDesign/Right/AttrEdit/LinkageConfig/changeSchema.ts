import type { FormSchema } from '@/types'

const schema = (): FormSchema => {
  return {
    labelWidth: 100,
    labelAlign: 'top',
    items: [
      {
        hideLabel: true,
        name: 'change',
        component: 'FormList',
        children: [
          {
            label: '目标字段',
            name: 'target',
            component: 'Input',
            help: '目标字段的name'
          },
          {
            label: '触发条件',
            name: 'condition',
            component: 'Input',
            help: '输入一个JS表达式，当表达式结果为true时才触发联动。如果不设置，默认会一直触发'
          },
          {
            label: '新数据',
            name: 'value',
            component: 'Input'
          }
        ],
        props: {
          mode: 'card',
          title: '数据联动'
        }
      }
    ]
  }
}

export default schema
