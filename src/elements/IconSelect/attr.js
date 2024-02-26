import { linkageAttr, basicAttr, highAttr, mergeAttr } from '@/config/commonAttr'

export default mergeAttr({
  basic: basicAttr(['props.readonly', 'props.placeholder']),
  high: highAttr(),
  linkage: linkageAttr
})
