import { linkageAttr, basicAttr, highAttr, mergeAttr } from '@/config/commonAttr'

export default mergeAttr({
  basic: basicAttr(),
  high: [
    ...highAttr(),
    {
      label: '最长字数',
      component: 'InputNumber',
      name: 'props.maxlength'
    },
    {
      label: '最小行数',
      component: 'InputNumber',
      name: 'props.autosize.minRows',
      initialValue: 2
    },
    {
      label: '最大行数',
      component: 'InputNumber',
      name: 'props.autosize.maxRows',
      initialValue: 999
    }
  ],
  linkage: linkageAttr
})
