import { isEqual } from 'lodash'
import setDataByPath from './setDataByPath'
import getDataByPath from './getDataByPath'

const handleLinkages = ({ newVal, oldVal, formValues, formItems }) => {
  for (const item of formItems) {
    const newValue = getDataByPath(newVal, item.name)
    const oldValue = getDataByPath(oldVal, item.name)

    if (item.change && !isEqual(newValue, oldValue)) {
      item.change.forEach(({ target, value }) => {
        formValues.value = setDataByPath(formValues.value, target, value)
      })
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
