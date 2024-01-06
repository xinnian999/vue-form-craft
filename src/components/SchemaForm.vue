<template>
  <el-form
    :model="form"
    :label-position="props.schema?.labelAlign"
    :size="props.schema?.size"
    ref="formRef"
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
  watch
} from 'vue'
import { ElMessage } from 'element-plus'
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
  }
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])

const stateForm = ref({})

const form = computed({
  get() {
    return props.modelValue || stateForm.value
  },
  set(val) {
    emit('update:modelValue', val)
    stateForm.value = val
  }
})

const selectData = reactive({})

// 转换为动态配置
const formItems = computed(() => {
  const context = {
    $values: form.value,
    $form: form.value,
    $selectData: selectData,
    $utils: {}
  }
  return deepParse(props.schema.items, context)
})

watch(
  form,
  (newVal, oldVal) => {
    handleLinkages({ newVal, oldVal, form, formItems: formItems.value })
  },
  { deep: true }
)

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

provide('$schema', props.schema)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, reset })

defineExpose({ submit, validate, selectData, getFormValues, setFormValues, reset })
</script>
