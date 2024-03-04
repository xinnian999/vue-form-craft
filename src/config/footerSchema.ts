import type { formItemType } from '@/config/commonType'

export default {
  component: 'Inline',
  children: [
    {
      component: 'Button',
      props: {
        name: '提交',
        clickEvent: 'submitForm',
        style: {
          'margin-left': 'auto',
          display: 'flex'
        }
      },
      designKey: 'form-aBMY',
      name: 'submit'
    },
    {
      component: 'Button',
      props: {
        name: '重置',
        clickEvent: 'resetForm',
        type: 'default'
      },
      designKey: 'form-mtnY',
      name: 'IxjeOB'
    }
  ],
  props: {
    align: 'left',
    gap: 10
  },
  designKey: 'design-2NnI',
  name: 'form-dxYP'
} as formItemType
