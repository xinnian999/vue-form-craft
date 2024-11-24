import type { FormSchema } from '@vue-form-craft/types'

export default {
  labelWidth: 150,
  labelAlign: 'top',
  size: 'default',
  scrollToError: true,
  items: [
    {
        label: '自定义',
        component: 'JsonEdit',
        designKey: 'design-A2bj',
        name: '.'
      }
  ]
} satisfies FormSchema
