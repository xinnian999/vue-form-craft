<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="schema.disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    ref="formRef"
    v-bind="$attrs"
    id="SchemaForm"
  >
    <FormRender :formItems="formItems" />
  </el-form>
</template>

<script setup lang="jsx">
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
  onMounted
} from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { handleLinkages, deepParse } from '@/utils'
import FormRender from './FormRender.vue'
import { cloneDeep, merge } from 'lodash'

defineOptions({
  name: 'SchemaForm'
})

const formRef = ref(null)

const props = defineProps({
  // 表单数据源，双向绑定
  modelValue: {
    type: Object
  },
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] })
  },
  schemaContext: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'onSubmit', 'onChange'])

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

watch(
  () => cloneDeep(formValues.value),
  (newVal, oldVal) => {
    emit('onChange', newVal)
    handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value })
  },
  { deep: true }
)

const validate = () => formRef.value.validate()

const submit = async () => {
  try {
    await validate()
    emit('onSubmit', formValues.value)
    return formValues.value
  } catch (e) {
    ElMessage.error('表单填写校验不通过！')
    return Promise.reject(e)
  }
}

const getFormValues = () => ({ ...formValues.value })
const setFormValues = (values) => {
  formValues.value = { ...formValues.value, ...values }
}

const reset = () => (formValues.value = initialValues)

// 保持schema的响应 传递给后代使用
const currentSchema = computed(() => props.schema)

provide('$schema', currentSchema)
provide('$formValues', formValues)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })
provide('$initialValues', initialValues)

onMounted(() => {
  formValues.value = merge(formValues.value, initialValues)
})

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset, context })
</script>
