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

  <div class="vue-form-craft-footer" v-if="footer">
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="() => resetFields()">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  reactive,
  provide,
  watch,
  nextTick,
  inject,
  type Ref
} from 'vue'
import type { FormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@vue-form-craft/utils'
import FormItemRender from './FormItemRender.vue'
import { cloneDeep, merge } from 'lodash'
import type { FormSchema, Locale } from '@vue-form-craft/config/commonType'
import { $schema, $formValues, $selectData, $initialValues} from '@vue-form-craft/config/symbol'
import locales from '@vue-form-craft/config/locales'

defineOptions({
  name: 'FormRender'
})

const props = defineProps<
  Readonly<{
    modelValue?: Record<string, any>
    schema: FormSchema
    schemaContext?: Record<string, any>
    design?: boolean
    footer?: boolean
  }>
>()

const emit = defineEmits<{
  'update:modelValue': [values: Record<string, any>]
  onFinish: [values: Record<string, any>]
}>()

const formRef = ref<FormInstance>()

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

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

const lang = inject<Ref<'zh' | 'en'>>('vfc-lang')!

const locale = computed<Locale>(() => locales[lang.value])

const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $initialValues: initialValues,
  $locale:locale.value
}))

const formItems = computed(() => deepParse(props.schema.items || [], context.value))

const formLabelWidth = computed(() => props.schema.labelWidth + 'px')

// 保持schema的响应 传递给后代使用
const currentSchema = computed(() => props.schema)

const validate = () => formRef.value?.validate()

const resetFields = (names?: string[]) => {
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

const handleSubmit = async () => {
  await validate()
  emit('onFinish', formValues.value)
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
  updateFormValues: (values) => (formValues.value = values)
})
provide($selectData, {
  selectData,
  updateSelectData: (key, value) => {
    selectData[key] = value
  }
})

provide($initialValues, {
  initialValues,
  updateInitialValues: (values) => {
    Object.assign(initialValues, values)
  }
})

defineExpose({ validate, context, resetFields })
</script>

<style lang="less">
.vue-form-craft-footer {
  margin-left: v-bind(formLabelWidth);
}
</style>
