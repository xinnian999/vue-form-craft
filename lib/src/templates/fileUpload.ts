import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '附件上传',
      name: 'files',
      component: 'Upload',
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        multiple: true,
        limit: 3,
        'show-file-list': true,
        accept: '.png,.jpg,.jpeg,.pdf'
      },
      required: true,
      help: '支持 png/jpg/jpeg/pdf，最多3个',
    },
    {
      label: '说明',
      name: 'desc',
      component: 'TextArea',
      props: { placeholder: '请填写上传说明（可选）' },
    }
  ]
} satisfies FormSchema
