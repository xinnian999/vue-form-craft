import type { FormSchema } from '@vue-form-craft/types'

export default {
  labelWidth: 100,
  labelAlign: 'top',
  items: [
    {
      label: '快速配置',
      children: [
        {
          component: 'Input',
          designKey: 'design-B5fm',
          name: 'name',
          label: '联动项',
          props: {
            placeholder: '请输入文本'
          }
        },
        {
          label: '方式',
          props: {
            mode: 'static',
            options: [
              {
                label: '强制赋值',
                value: 'equal'
              },
              {
                label: '条件赋值',
                value: 'if'
              }
            ],
            placeholder: '请选择...'
          },
          component: 'Select',
          designKey: 'design-icI8',
          name: 'type'
        },
        {
          component: 'Input',
          designKey: 'design-POft',
          name: 'form-P2qc',
          label: '赋值为',
          props: {
            placeholder: '请输入文本'
          }
        }
      ],
      props: {
        mode: 'table',
        title: '数据',
        minLines: 0,
        maxLines: 999,
        allowAdd: true,
        allowReduce: true
      },
      component: 'FormList',
      designKey: 'design-NyLz',
      name: 'quick'
    },
    {
      label: '手动配置',
      component: 'JsonEdit',
      designKey: 'design-A2bj',
      name: '.'
    }
  ]
} satisfies FormSchema
