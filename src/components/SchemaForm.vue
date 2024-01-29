<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    ref="formRef"
    :style="style"
    :class="props.class"
    id="SchemaForm"
  >
    <FormRender v-model="formValues" :formItems="formItems" />
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
  defineOptions
} from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { handleLinkages, deepParse } from '@/utils'
import FormRender from './FormRender.vue'
import { cloneDeep } from 'lodash'

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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: null,
  class: null
})

const emit = defineEmits(['update:modelValue', 'onSubmit', 'onChange'])

const selectData = reactive({})

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
  $utils: {},
  ...props.schemaContext
}))

// 转换为动态配置
const formItems = computed(() => deepParse(props.schema.items, context.value))

// 保证schema的响应式
const currentSchema = computed(() => props.schema)

watch(
  () => cloneDeep(formValues.value),
  (newVal, oldVal) => {
    emit('onChange', newVal)
    handleLinkages({ newVal, oldVal, form: formValues, formItems: formItems.value })
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

const reset = () => formRef.value.resetFields()

provide('$schema', currentSchema)
provide('$formValues', formValues)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset, context })
</script>
