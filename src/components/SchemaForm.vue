<template>
  <el-form
    :model="formValues"
    :label-position="currentSchema.labelAlign"
    :size="currentSchema.size"
    :disabled="disabled"
    :hide-required-asterisk="currentSchema.hideRequiredAsterisk"
    ref="formRef"
    :style="style"
    :class="props.class"
    id="SchemaForm"
    v-loading="loading"
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
  watchEffect,
  inject,
  onBeforeMount
} from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { handleLinkages, deepParse } from '@/utils'
import FormRender from './FormRender.vue'

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
  schemaId: [String, Number],
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

const currentSchema = ref({})

const stateForm = ref({})

const loading = ref(false)

const selectData = reactive({})

const getSchema = inject('$getSchema')

const formValues = computed({
  get() {
    return props.modelValue || stateForm.value
  },
  set(val) {
    emit('update:modelValue', val)
    stateForm.value = val
  }
})

const context = computed(() => ({
  $values: formValues.value,
  $form: formValues.value,
  $selectData: selectData,
  $utils: {},
  ...props.schemaContext
}))

// 转换为动态配置
const formItems = computed(() => {
  return deepParse(currentSchema.value.items, context.value)
})

watch(
  formValues,
  (newVal, oldVal) => {
    emit('onChange', newVal)
    handleLinkages({ newVal, oldVal, form: formValues, formItems: formItems.value })
  },
  { deep: true }
)

watchEffect(() => {
  currentSchema.value = props.schema
})

onBeforeMount(async () => {
  if (props.schemaId) {
    loading.value = true
    currentSchema.value = await getSchema(props.schemaId)

    loading.value = false
  }
})

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
provide('$formValues', formValues.value)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset, context })
</script>

<style scoped>
#SchemaForm {
  /* overflow: auto; */
}
</style>
