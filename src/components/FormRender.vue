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
import { ref, computed, reactive, provide, watch, nextTick, inject, readonly, type Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@vue-form-craft/utils'
import FormItemRender from './FormItemRender.vue'
import { cloneDeep, merge } from 'lodash'
import type { FormSchema } from '@vue-form-craft/config/commonType'
import { $formInstance } from '@vue-form-craft/config/symbol'
import { useLocale } from '@vue-form-craft/hooks'

const props = defineProps<
  Readonly<{
    modelValue?: Record<string, any>
    schema: FormSchema
    schemaContext?: Record<string, any>
    design?: boolean
    footer?: boolean
    read?: boolean
  }>
>()

const emit = defineEmits<{
  'update:modelValue': [values: Record<string, any>]
  onFinish: [values: Record<string, any>]
}>()

const formRef = ref<FormInstance>()

const formValues = defineModel<Record<string, any>>({ default: () => ({}) })

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

const locale = useLocale()

const context = computed(() => {
  // console.log('selectData===>',selectData);
  // console.log('read===>',props.read);

  return {
    ...props.schemaContext,
    $values: formValues.value,
    $selectData: selectData,
    $locale: locale.value
  }
})

const formItems = computed(() => deepParse(props.schema.items || [], context.value))

const formLabelWidth = computed(() => props.schema.labelWidth + 'px')

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
  nextTick(() => {
    formValues.value = merge(formValues.value, newVal)
  })
})

provide($formInstance, {
  formValues: readonly(formValues),
  selectData: readonly(selectData),
  initialValues: readonly(initialValues),
  schema: computed(() => props.schema),
  read: computed(() => props.read),
  updateFormValues: (values) => (formValues.value = values),
  updateSelectData: (key, value) => {
    selectData[key] = value
  },
  updateInitialValues: (values) => {
    Object.assign(initialValues, values)
  },
  validate,
  resetFields
})

defineExpose({ validate, context, resetFields })
</script>

<style lang="less">
.vue-form-craft-footer {
  margin-left: v-bind(formLabelWidth);
}
</style>
