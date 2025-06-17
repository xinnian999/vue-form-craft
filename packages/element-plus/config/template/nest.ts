import type { FormSchema } from "@/types/index";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '单行文本',
      component: 'Input',
      props: {
        placeholder: '请输入文本'
      },
      designKey: 'design-NUCU',
      name: 'form-4K4K',
    },
    {
      label: '开关',
      component: 'Switch',
      props: {
        'inline-prompt': false
      },
      designKey: 'design-qL70',
      name: 'form-ambf'
    },
    {
      component: 'Card',
      children: [
        {
          label: '急急急',
          component: 'Input',
          props: {
            placeholder: '请输入文本'
          },
          designKey: 'design-xqQ2',
          name: 'form-0NH3',
        },
        {
          label: '单选框组',
          component: 'Radio',
          props: {
            mode: 'static',
            options: [
              {
                label: '选项1',
                value: 'value1'
              },
              {
                label: '选项2',
                value: 'value2'
              },
              {
                label: '选项3',
                value: 'value3'
              }
            ],
            labelKey: 'label',
            valueKey: 'value',
            optionType: 'circle',
            direction: 'horizontal',
            space: 20
          },
          designKey: 'design-kmbI',
          name: 'form-0Pe4'
        }
      ],
      props: {
        header: '卡片'
      },
      designKey: 'design-J9Hg',
      name: 'form-gi3U'
    }
  ]
} satisfies FormSchema
