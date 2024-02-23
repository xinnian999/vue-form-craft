import { isEqual, cloneDeep } from 'lodash'
import setDataByPath from './setDataByPath'
import getDataByPath from './getDataByPath'

const handleLinkages = ({ newVal, oldVal, formValues, formItems }) => {
  for (const item of formItems) {
    const newValue = getDataByPath(newVal, item.name)
    const oldValue = getDataByPath(oldVal, item.name)

    if (item.change && !isEqual(newValue, oldValue)) {
      let temp = cloneDeep(formValues.value)
      item.change.forEach(({ target, value }) => {
        temp = setDataByPath(temp, target, value)
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
