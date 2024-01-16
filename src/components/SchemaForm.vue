<template>
  <el-form
    :model="form"
    :label-position="currentSchema.labelAlign"
    :size="currentSchema.size"
    :disabled="disabled"
    :hide-required-asterisk="currentSchema.hideRequiredAsterisk"
    ref="formRef"
    :style="style"
    :class="props.class"
  >
    <FormRender v-model="form" :formItems="formItems" />
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
  onMounted
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
  style: {
    type: Object,
    default: () => ({})
  },
  class: null
})

const emit = defineEmits(['update:modelValue', 'onSubmit', 'onChange'])

const currentSchema = ref({})

const stateForm = ref({})

const selectData = reactive({})

const getSchema = inject('$getSchema')

const form = computed({
  get() {
    return props.modelValue || stateForm.value
  },
  set(val) {
    emit('update:modelValue', val)
    stateForm.value = val
  }
})

const context = computed(() => ({
  $values: form.value,
  $form: form.value,
  $selectData: selectData,
  $utils: {},
  ...props.schemaContext
}))

// 转换为动态配置
const formItems = computed(() => {
  return deepParse(currentSchema.value.items, context.value)
})

watch(
  form,
  (newVal, oldVal) => {
    emit('onChange', newVal)
    handleLinkages({ newVal, oldVal, form, formItems: formItems.value })
  },
  { deep: true }
)

watchEffect(() => {
  currentSchema.value = props.schema
})

onMounted(async () => {
  if (props.schemaId) {
    currentSchema.value = await getSchema(props.schemaId)
  }
})

const validate = () => formRef.value.validate()

const submit = async () => {
  try {
    await validate()
    emit('onSubmit', form.value)
    return form.value
  } catch (e) {
    ElMessage.error('表单填写校验不通过！')
    return Promise.reject(e)
  }
}

const getFormValues = () => ({ ...form.value })
const setFormValues = (values) => {
  form.value = { ...form.value, ...values }
}

const reset = () => formRef.value.resetFields()

provide('$schema', currentSchema)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset, context })
</script>
