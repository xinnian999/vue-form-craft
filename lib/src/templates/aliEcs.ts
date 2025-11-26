import type { FormSchema } from 'formora'

export default {
  labelWidth: 150,
  labelAlign: 'left',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  initialValues: {},
  items: [
    {
      name: 'form-pBQE',
      component: 'Card',
      props: {
        header: ''
      },
      designKey: 'design-2QJZ',
      children: [
        {
          label: '付费类型',
          name: 'form-0gdY',
          component: 'Radio',
          props: {
            mode: 'static',
            options: [
              {
                label: '包年包月',
                value: 'value1'
              },
              {
                label: '按量付费',
                value: 'value2'
              },
              {
                label: '抢占式实例',
                value: 'value3'
              }
            ],
            optionType: 'button',
            direction: 'horizontal',
            space: 20
          },
          designKey: 'design-4lQ1',
          size: 'default'
        }
      ]
    }
  ],
  style: {
    backgroundColor: 'rgb(245, 245, 245)'
  }
} satisfies FormSchema
