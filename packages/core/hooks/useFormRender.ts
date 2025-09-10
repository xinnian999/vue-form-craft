import type { FormInstance as ElFormInstance } from 'element-plus'
import { cloneDeep, mergeWith } from 'lodash'
import { computed, onMounted, provide, reactive, readonly, ref, toRefs, type Ref } from 'vue'
import type { FormInstance, FormRenderProps, FormSchema } from '@vue-form-craft/core'
import { $formInstance, deepParse, getDataByPath, setDataByPath, useLocale } from '@vue-form-craft/core'

const useFormRender = ({
  props,
  emits,
  schema,
  formValues
}: {
  props: FormRenderProps
  emits: (event: any, ...args: any[]) => void
  schema: Ref<FormSchema>
  formValues: Ref<Record<string, any>>
}) => {
  const formRef = ref<ElFormInstance>()

  const formItems = computed({
    get() {
      if (props.design) {
        return schema.value.items
      }

      return deepParse(props.schema.items || [], context.value)
    },
    set(values) {
      schema.value.items = values
    }
  })

  const selectData = reactive<Record<string, Record<string, any>>>({})

  const initialValues = reactive<Record<string, any>>({})

  const vCodePass = ref(false)

  const locale = useLocale()

  const context = computed(() => ({
    ...props.schemaContext,
    $values: formValues.value,
    $selectData: selectData,
    $locale: locale.value
  }))

  // 支持从schema初始化默认值对象
  onMounted(() => {
    if (props.schema?.initialValues) {
      const initialValues = cloneDeep(props.schema?.initialValues)

      formValues.value = mergeWith(initialValues, formValues.value, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return srcValue // 不深度合并数组
        }
      })
    }
  })

  const validate: FormInstance['validate'] = () => formRef.value?.validate()

  const submit: FormInstance['submit'] = () => {
    validate()
      ?.then(() => {
        emits('finish', formValues.value)
      })
      .catch((e) => {
        emits('failed', e)
      })
  }

  const resetFields: FormInstance['resetFields'] = (names) => {
    emits('reset')

    if (names) {
      let temp = cloneDeep(formValues.value)
      names.forEach((name) => {
        temp = setDataByPath(temp, name, getDataByPath(initialValues, name))
      })
      formValues.value = temp
    } else {
      formValues.value = initialValues
    }
  }

  const updateFormValues: FormInstance['updateFormValues'] = (values) => {
    Object.assign(formValues.value, values)
  }

  const updateSelectData: FormInstance['updateSelectData'] = (key, value) => {
    selectData[key] = value
  }

  const updateInitialValues: FormInstance['updateInitialValues'] = (values) => {
    Object.assign(initialValues, values)
  }

  const updateVCodePass = (value: boolean) => {
    vCodePass.value = value
  }

  const instance = readonly({
    ...toRefs(props),
    formValues,
    selectData,
    initialValues,
    context,
    vCodePass,
    updateFormValues,
    updateSelectData,
    updateInitialValues,
    updateVCodePass,
    validate,
    resetFields,
    submit
  })

  provide($formInstance, instance)

  return {
    formRef,
    formItems,
    instance
  }
}

export default useFormRender
