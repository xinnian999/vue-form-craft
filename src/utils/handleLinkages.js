import { isArray, cloneDeep, isEqual } from 'lodash'

const handleLinkages = ({ newVal, oldVal, form, formItems }) => {
  const formValue = cloneDeep(form.value)

  for (const item of formItems) {
    //TODO：bug。自增组件使用linkage无效，因为新旧val一样不知什么原因

    // if (item.linkage) {
    //   console.log(item, newVal[item.name], oldVal[item.name]);
    // }

    if (item.linkage && !isEqual(newVal[item.name], oldVal[item.name])) {
      item.linkage.forEach((v) => {
        const [name, path, child] = v.target.split('.')

        if (v.value != null) {
          // 有路径视为自增组件
          if (path && path === '*' && isArray(formValue[name])) {
            formValue[name] = formValue[name].map((item) => ({
              ...item,
              [child]: v.value
            }))
          } else {
            formValue[name] = v.value
          }
        }
      })

      form.value = formValue
    }

    if (item.children) {
      handleLinkages({ newVal, oldVal, form, formItems: item.children })
    }
  }
}

export default handleLinkages
