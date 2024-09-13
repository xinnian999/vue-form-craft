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
    <FormItemRender v-if="!design" :formItems="formItems" />
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
  nextTick
} from 'vue'
import { ElForm } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@/utils'
import FormItemRender from './FormItemRender.vue'
import { cloneDeep, merge } from 'lodash'
import type { FormSchema } from '@/config/commonType'
import { $schema, $formValues, $selectData, $formEvents, $initialValues } from '@/config/symbol'

defineOptions({
  name: 'FormRender'
})

const props = defineProps<
  Readonly<{
    modelValue?: Record<string, any>
    schema: FormSchema
    schemaContext?: Record<string, any>
    design?: boolean
  }>
>()

const emit = defineEmits<{
  'update:modelValue': [values: Record<string, any>]
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
    nextTick(() => {
      handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value })
    })
  },
  { deep: true }
)

watch(initialValues, (newVal) => {
  formValues.value = merge(formValues.value, newVal)
})

provide($schema, {
  schema: currentSchema,
  updateSchema: () => {}
})

provide($formValues, {
  formValues,
  updateFormValues: (values: Record<string, any>) => (formValues.value = values)
})
provide($selectData, selectData)
provide($formEvents, { validate, resetFields })
provide($initialValues, {
  initialValues,
  updateInitialValues: (values: Record<string, any>) => Object.assign(initialValues, values)
})

defineExpose({ validate, context, resetFields })
</script>
