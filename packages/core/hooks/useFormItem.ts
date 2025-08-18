import { computed, onBeforeMount, reactive, watch } from 'vue'
import { tools } from '@form-magic/core'
import type { FormItemType } from '@form-magic/core'
import { useFormInstance, useElements } from '@form-magic/core'
import { cloneDeep, isArray, isEqual } from 'lodash'

const useFormItem = (props: FormItemType) => {
  const { getDataByPath, setDataByPath, ns, isRegexString } = tools

  const formInstance = useFormInstance()

  const elements = useElements()

  const dialogState = reactive({
    visible: false,
    title: ''
  })

  const handleDialog = () => {
    dialogState.visible = true
    dialogState.title = props.label!
  }

  const value = computed({
    get() {
      return getDataByPath(formInstance.formValues, props.name)
    },
    set(val) {
      const newValues = setDataByPath(formInstance.formValues, props.name, val)
      formInstance.updateFormValues(newValues)
    }
  })

  const computeRules = computed(() => {
    const { rules, required, component } = props

    const ruleData = []

    if (required) {
      ruleData.push({ required: true, message: '该字段是必填字段', trigger: 'blur' })
    }

    if (rules) {
      const ruleParse = rules.map((rule) => {
        const { type, message, trigger, customReg, templateExp } = rule

        const ruleDef = {
          message,
          trigger
        }

        if (['email', 'url'].includes(type)) {
          return { ...ruleDef, type }
        }
        // 自定义正则
        if (type === 'custom') {
          return {
            ...ruleDef,
            pattern: customReg
          }
        }

        // 解析字符串的正则
        if (isRegexString(type)) {
          return {
            ...ruleDef,
            pattern: type
          }
        }

        // 模板表达式
        if (type === 'template') {
          return {
            ...ruleDef,
            validator: () => templateExp
          }
        }

        return {}
      })

      return [...ruleData, ...ruleParse]
    }

    if (component === 'VerifyCode') {
      const vCodeRule = {
        trigger: 'blur',
        message: '验证码错误！',
        validator: () => formInstance.vCodePass
      }

      return [...ruleData, vCodeRule]
    }

    return ruleData
  })

  const config = computed(() => {
    const data = elements[props.component] || {}
    if (!data.modelName) {
      data.modelName = 'modelValue'
    }

    return data
  })

  const formItemProps = computed(() => {
    const newProps: Record<string, any> = {
      name: props.name,
      ...props.props
    }

    if (props.children) {
      newProps.children = props.children
    }

    return newProps
  })

  onBeforeMount(() => {
    if (value.value === undefined && props.initialValue !== undefined && !formInstance.design) {
      const newInitialValues = setDataByPath(
        formInstance.initialValues,
        props.name,
        props.initialValue
      )

      formInstance.updateInitialValues(newInitialValues)

      value.value = props.initialValue
    }
  })

  watch(
    value,
    (newVal, oldVal) => {
      const change = props.change
      const diff = isEqual(newVal, oldVal)

      if (!change || diff) return

      let temp = cloneDeep(formInstance.formValues)

      change.forEach(({ target, value, condition }) => {
        if (condition === false) return

        if (target.includes('.*.')) {
          //自增组件特殊处理
          const targetArr = target.split('.*.')
          const listTarget = targetArr.pop()!
          const targetParse = targetArr.join('.')
          const list = getDataByPath(formInstance.formValues, targetParse)
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
          return
        }

        temp = setDataByPath(temp, target, value)
      })

      formInstance.updateFormValues(temp)
    },
    { immediate: true }
  )

  return {
    value,
    computeRules,
    config,
    formItemProps,
    dialogState,
    handleDialog,
    formInstance
  }
}

export default useFormItem
