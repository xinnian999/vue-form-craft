import type { FormSchema } from '@vue-form-craft/core'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '预约人',
      name: 'guestName',
      component: 'Input',
      props: { placeholder: '请输入预约人姓名' },
      required: true,
      designKey: 'design-drb-guest'
    },
    {
      label: '预约时间',
      name: 'reserveRange',
      component: 'DatePicker',
      props: {
        type: 'datetimerange',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        clearable: true
      },
      required: true,
      designKey: 'design-drb-range'
    },
    {
      label: '人数',
      name: 'people',
      component: 'InputNumber',
      props: { min: 1, 'controls-position': 'right' },
      initialValue: 1,
      designKey: 'design-drb-people'
    },
    {
      label: '备注',
      name: 'note',
      component: 'TextArea',
      props: {
        placeholder: "{{ $values.guestName ? '填写给 ' + $values.guestName + ' 的备注' : '填写备注信息' }}"
      },
      designKey: 'design-drb-note'
    }
  ]
} satisfies FormSchema
