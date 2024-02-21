import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: basicAttr(['props.readonly', 'props.placeholder']),
  high: highAttr(),
  linkage: linkageAttr
})
