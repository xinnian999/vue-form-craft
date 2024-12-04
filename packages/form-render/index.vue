<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="schema.disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    :scroll-to-error="schema.scrollToError"
    ref="formRef"
    v-bind="$attrs"
  >
    <slot />

    <FormItemGroup :list="formItems" :empty-text="locale.canvas.emptyTip" :empty-size="18" />
    <Footer />
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, provide, toRefs, readonly, onMounted } from 'vue'
import type { FormInstance as ElFormInstance } from 'element-plus'
import { deepParse, setDataByPath, getDataByPath } from '@vue-form-craft/utils'
import { cloneDeep, merge, mergeWith } from 'lodash'
import type { FormInstance, FormRenderProps, FormSchema } from '@vue-form-craft/types'
import { $formInstance } from '@vue-form-craft/config/symbol'
import { useLocale } from '@vue-form-craft/hooks'
import Footer from './Footer.vue'
import { FormItemGroup } from '@vue-form-craft/components'

const props = defineProps<FormRenderProps>()

const emit = defineEmits<{
  finish: [values: Record<string, any>]
  failed: [
    errors: {
      message?: string
      fieldValue?: any
      field?: string
    }[]
  ]
  reset: []
}>()

const formRef = ref<ElFormInstance>()

const formValues = defineModel<Record<string, any>>({ default: reactive({}) })

const schema = defineModel<FormSchema>('schema', {
  default: reactive({
    labelWidth: 150,
    labelAlign: 'right',
    scrollToError: true,
    size: 'default',
    items: []
  })
})

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
      emit('finish', formValues.value)
    })
    .catch((e) => {
      emit('failed', e)
    })
}

const resetFields: FormInstance['resetFields'] = (names) => {
  emit('reset')

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

defineExpose(instance)
</script>
