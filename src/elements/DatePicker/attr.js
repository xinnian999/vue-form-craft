import { linkageAttr, basicAttr, highAttr, mergeAttr } from '@/config/commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(),
    {
      label: '类型',
      component: 'Radio',
      name: 'props.type',
      props: {
        mode: 'static',
        options: [
          { label: '日期时间', value: 'datetime' },
          { label: '日期', value: 'date' },
          { label: '年月', value: 'month' },
          { label: '日期范围', value: 'daterange' },
          { label: '日期时间范围', value: 'datetimerange' }
        ]
      }
    }
  ],
  high: [...highAttr(), { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' }],

  linkage: linkageAttr
})
