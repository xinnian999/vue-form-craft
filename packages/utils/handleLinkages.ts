import { isEqual, cloneDeep, isArray } from 'lodash'
import type { FormItemType } from '@vue-form-craft/types'
import setDataByPath from './setDataByPath'
import getDataByPath from './getDataByPath'

type handleLinkagesType = (obj: {
  newVal: Record<string, any>
  oldVal?: Record<string, any>
  formValues: Record<string, any>
  formItems: FormItemType[]
}) => void

const handleLinkages: handleLinkagesType = ({ newVal, oldVal={}, formValues, formItems }) => {
  for (const item of formItems) {
    const newValue = getDataByPath(newVal, item.name)
    const oldValue = getDataByPath(oldVal, item.name)

    if (item.change && !isEqual(newValue, oldValue)) {
      let temp = cloneDeep(formValues.value)
      item.change.forEach(({ target, value, condition }) => {
        if (condition !== false) {
          if (target.includes('.*.')) {
            //自增组件特殊处理
            const targetArr = target.split('.*.')
            const listTarget = targetArr.pop()!
            const targetParse = targetArr.join('.')
            const list = getDataByPath(newVal, targetParse)
            if (isArray(list)) {
              temp = setDataByPath(
                temp,
                targetParse,
                list.map((item) => {
                  return {
                    ...item,
                    [listTarget]: value
                  }
                })
              )
            }
          } else {
            temp = setDataByPath(temp, target, value)
          }
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
