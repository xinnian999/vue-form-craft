import { isEqual, cloneDeep } from 'lodash'
import type { FormItemType } from '@/config/commonType'
import setDataByPath from './setDataByPath'
import getDataByPath from './getDataByPath'

type handleLinkagesType = (obj: {
  newVal: Object
  oldVal: Object
  formValues: Record<string, any>
  formItems: FormItemType[]
}) => void

const handleLinkages: handleLinkagesType = ({ newVal, oldVal, formValues, formItems }) => {
  for (const item of formItems) {
    const newValue = getDataByPath(newVal, item.name)
    const oldValue = getDataByPath(oldVal, item.name)

    if (item.change && !isEqual(newValue, oldValue)) {
      let temp = cloneDeep(formValues.value)
      item.change.forEach(({ target, value, condition }) => {
        if (condition !== false) {
          temp = setDataByPath(temp, target, value)
        }
      })
      formValues.value = temp
    }

    if (item.children && item.component !== 'FormList') {
      handleLinkages({
        newVal,
        oldVal,
        formValues,
        formItems: item.children
      })
    }
  }
}

export default handleLinkages
