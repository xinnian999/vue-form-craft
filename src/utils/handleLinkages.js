import { isPlainObject, cloneDeep, isEqual } from 'lodash'
import setDataByPath from './setDataByPath'

const handleLinkages = ({ newVal, oldVal, formValues, formItems }) => {
  const tempFormValues = cloneDeep(formValues.value)
  for (const item of formItems) {
    if (item.change && !isEqual(newVal[item.name], oldVal[item.name])) {
      item.change.forEach(({ target, value }) => {
        setDataByPath(tempFormValues, target, value)
      })
      formValues.value = tempFormValues
    }

    if (item.children) {
      handleLinkages({
        newVal: isPlainObject(newVal) ? newVal[item.name] : newVal,
        oldVal: isPlainObject(oldVal) ? oldVal[item.name] : oldVal,
        formValues,
        formItems: item.children
      })
    }
  }
}

export default handleLinkages
