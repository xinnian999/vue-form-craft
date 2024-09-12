import type { FormSchema } from "@/release";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '单选框组',
      component: 'Radio',
      props: {
        mode: 'static',
        options: [
          {
            label: '选项1',
            value: '1',
            vv: '选1'
          },
          {
            label: '选项2',
            value: '2',
            vv: '选2'
          },
          {
            label: '选项3',
            value: '3',
            vv: '选3'
          }
        ],
        labelKey: 'label',
        valueKey: 'value',
        optionType: 'circle',
        direction: 'horizontal',
        space: 20
      },
      designKey: 'design-ajDw',
      name: 'A001',
      change: [
        {
          target: 'A002',
          value: '{{ $selectData.A001.vv }}'
        }
      ]
    },
    {
      label: '单行文本',
      component: 'Input',
      props: {
        placeholder: '请输入文本'
      },
      designKey: 'design-WiKD',
      name: 'A002'
    }
  ]
} satisfies FormSchema
