import type { FormSchema } from '@vue-form-craft/types'

 const schema = (): FormSchema => {
  // const targetOptions = build(schema.items).filter((item) => item.value !== current.name)

  return {
    labelWidth: 100,
    labelAlign: 'top',
    items: [
      {
        // label: '值联动',
        // help: '本字段值改变时触发，修改其他字段的值',
        hideLabel: true,
        name: 'change',
        component: 'FormList',
        children: [
          // {
          //   label: '目标字段',
          //   name: 'target',
          //   component: 'Select',
          //   props: {
          //     mode: 'static',
          //     options: targetOptions,
          //     placeholder: '请选择目标字段',
          //     labelKey: 'label',
          //     valueKey: 'value'
          //   }
          // },
          {
            label: '目标字段',
            name: 'target',
            component: 'Input',
            help: '如果是自增组件内部联动，直接输入子组件的name。如果是外部联动自增组件，就是formlist.*.key'
          },
          {
            label: '触发条件',
            name: 'condition',
            component: 'Input',
            help: '必须输入一个模板表达式，当表达式结果为true时才触发联动。如果不设置，默认会一直触发'
          },
          {
            label: '值',
            name: 'value',
            component: 'Input',
            help: '支持模板表达式'
          }
        ],
        props: {
          mode: 'card',
          title: '联动字段'
        }
      }
    ]
  }
}

export default schema