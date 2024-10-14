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
    <template v-if="!design">
      <FormItem v-for="item in formItems" :key="item.name" v-bind="item" />
    </template>

    <slot />

    <FormFooter />
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, provide, watch, nextTick, toRefs } from 'vue'
import type { FormInstance as ElFormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@vue-form-craft/utils'
import { cloneDeep, merge } from 'lodash'
import type { FormInstanceSource, FormRenderProps } from '@vue-form-craft/config/commonType'
import { $formInstance } from '@vue-form-craft/config/symbol'
import { useLocale } from '@vue-form-craft/hooks'
import FormFooter from './FormFooter.vue'
import FormItem from './FormItem.vue'

const props = defineProps<FormRenderProps>()

const emit = defineEmits<{
  onFinish: [values: Record<string, any>]
}>()

const formRef = ref<ElFormInstance>()

const formValues = defineModel<Record<string, any>>({ default: () => ({}) })

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

const locale = useLocale()

const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $locale: locale.value
}))

const formItems = computed(() => deepParse(props.schema.items || [], context.value))

watch(
  formValues,
  async (newVal, oldVal) => {
    await nextTick()
    handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value })
  },
  { deep: true }
)

watch(initialValues, async (newVal) => {
  await nextTick()
  formValues.value = merge(formValues.value, newVal)
})

const validate: FormInstanceSource['validate'] = () => formRef.value?.validate()

const submit: FormInstanceSource['submit'] = async () => {
  await validate()
  emit('onFinish', formValues.value)
}

const resetFields: FormInstanceSource['resetFields'] = (names) => {
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

const updateFormValues: FormInstanceSource['updateFormValues'] = (values) => {
  formValues.value = values
}

const updateSelectData: FormInstanceSource['updateSelectData'] = (key, value) => {
  selectData[key] = value
}

const updateInitialValues: FormInstanceSource['updateInitialValues'] = (values) => {
  Object.assign(initialValues, values)
}

const instance = {
  ...toRefs(props),
  formValues,
  selectData,
  initialValues,
  context,
  updateFormValues,
  updateSelectData,
  updateInitialValues,
  validate,
  resetFields,
  submit
}

provide($formInstance, instance)

defineExpose(instance)
</script>
