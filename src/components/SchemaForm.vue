<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="schema.disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    ref="formRef"
    v-bind="$attrs"
  >
    <FormRender v-if="!design" :formItems="formItems" />
    <FormItem
      v-if="footer && !design"
      v-bind="footerSchema"
      :style="{ paddingLeft: schema.labelWidth + 'px' }"
    />
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import {
  ref,
  defineProps,
  defineExpose,
  defineEmits,
  computed,
  reactive,
  provide,
  watch,
  defineOptions,
  watchEffect
} from 'vue'
import { ElForm } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@/utils'
import FormRender from './FormRender.vue'
import FormItem from './FormItem.vue'
import { cloneDeep, merge } from 'lodash'
import footerSchema from '@/config/footerSchema'
import { $schema, $formValues, $selectData, $formEvents, $initialValues } from '@/config/symbol'

defineOptions({
  name: 'SchemaForm'
})

const props = defineProps<
  Readonly<{
    modelValue?: anyObject
    schema: schemaType
    schemaContext?: anyObject
    design?: boolean
    footer?: boolean
  }>
>()

// watchEffect(() => {
//   console.log(props.footer)
// })

const emit = defineEmits<{
  'update:modelValue': [values: anyObject]
  onChange: [values: anyObject]
  onFinish: [values: anyObject]
  onFinishFailed: [e: anyObject]
}>()

const formRef = ref<FormInstance>()

const selectData = reactive({})

const initialValues = reactive({})

const stateFormValues = ref({})

const formValues = computed({
  get() {
    return props.modelValue || stateFormValues.value
  },
  set(values) {
    emit('update:modelValue', values)
    stateFormValues.value = values
  }
})

const context = computed(() => ({
  $values: formValues.value,
  $selectData: selectData,
  $initialValues: initialValues,
  ...props.schemaContext
}))

const formItems = computed(() => deepParse(props.schema.items || [], context.value))

// 保持schema的响应 传递给后代使用
const currentSchema = computed(() => props.schema)

const validate = () => formRef.value?.validate()

const submit = async () => {
  try {
    await validate()
    emit('onFinish', formValues.value)
    return formValues.value
  } catch (e) {
    emit('onFinishFailed', e)
    return Promise.reject(e)
  }
}

const getFormValues = () => ({ ...formValues.value })
const setFormValues = (values: anyObject) => {
  formValues.value = { ...formValues.value, ...values }
}

const resetFields = (names: string[]) => {
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

watch(
  formValues,
  (newVal, oldVal) => {
    emit('onChange', newVal)
    handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value })
  },
  { deep: true }
)

watch(initialValues, (newVal) => {
  formValues.value = merge(formValues.value, newVal)
})

provide($schema, currentSchema)
provide($formValues, {
  formValues,
  updateFormValues: (values: anyObject) => (formValues.value = values)
})
provide($selectData, selectData)
provide($formEvents, { submit, validate, getFormValues, setFormValues, resetFields })
provide($initialValues, {
  initialValues,
  updateInitialValues: (values: anyObject) => Object.assign(initialValues, values)
})

defineExpose({ submit, validate, getFormValues, setFormValues, resetFields, context })
</script>
