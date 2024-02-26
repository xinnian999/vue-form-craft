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
import { ElForm } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@/utils'
import FormRender from './FormRender.vue'
import FormItem from './FormItem.vue'
import { cloneDeep, merge } from 'lodash'
import footerSchema from './footerSchema'

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
  design: Boolean,
  footer: Boolean
})

const emit = defineEmits(['update:modelValue', 'onFinish', 'onFinishFailed', 'onChange'])

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
    emit('onFinish', formValues.value)
    return formValues.value
  } catch (e) {
    emit('onFinishFailed', e)
    return Promise.reject(e)
  }
}

const getFormValues = () => ({ ...formValues.value })
const setFormValues = (values) => {
  formValues.value = { ...formValues.value, ...values }
}

const resetFields = (names) => {
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

// 保持schema的响应 传递给后代使用
const currentSchema = computed(() => props.schema)

provide('$schema', currentSchema)
provide('$formValues', formValues)
provide('$selectData', selectData)
provide('$formEvents', { submit, validate, getFormValues, setFormValues, resetFields })
provide('$initialValues', initialValues)

watch(initialValues, (newVal) => {
  formValues.value = merge(formValues.value, newVal)
})

defineExpose({ submit, validate, getFormValues, setFormValues, resetFields, context })
</script>
