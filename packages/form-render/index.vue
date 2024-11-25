<template>
  <el-form
    :model="formValues"
    :label-position="schema.labelAlign"
    :size="schema.size"
    :disabled="schema.disabled"
    :hide-required-asterisk="schema.hideRequiredAsterisk"
    :scroll-to-error="schema.scrollToError"
    ref="formRef"
    v-bind="$attrs"
  >
    <slot />

    <FormItemGroup :list="formItems" :empty-text="locale.canvas.emptyTip" :empty-size="18" />
    <Footer />
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, provide, watch, nextTick, toRefs, readonly } from 'vue'
import type { FormInstance as ElFormInstance } from 'element-plus'
import { handleLinkages, deepParse, setDataByPath, getDataByPath } from '@vue-form-craft/utils'
import { cloneDeep, merge } from 'lodash'
import type { FormInstance, FormRenderProps, FormSchema } from '@vue-form-craft/types'
import { $formInstance } from '@vue-form-craft/config/symbol'
import { useLocale } from '@vue-form-craft/hooks'
import Footer from './Footer.vue'
import { FormItemGroup } from '@vue-form-craft/components'

const props = defineProps<FormRenderProps>()

const emit = defineEmits<{
  finish: [values: Record<string, any>]
  failed: [
    errors: {
      message?: string
      fieldValue?: any
      field?: string
    }[]
  ]
  reset: []
}>()

const formRef = ref<ElFormInstance>()

const formValues = defineModel<Record<string, any>>({ default: () => ({}) })

const schema = defineModel<FormSchema>('schema', {
  default: reactive({
    labelWidth: 150,
    labelAlign: 'right',
    scrollToError: true,
    size: 'default',
    items: []
  })
})

const formItems = computed({
  get() {
    if (props.design) {
      return schema.value.items
    }

    return deepParse(props.schema.items || [], context.value)
  },
  set(values) {
    schema.value.items = values
  }
})

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

const vCodePass = ref(false)

const locale = useLocale()

const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $locale: locale.value
}))

watch(
  formValues,
  async (newVal, oldVal) => {
    if (props.read) {
      return
    }
    await nextTick()

    setTimeout(() => {
      handleLinkages({ newVal, oldVal, formValues, formItems: formItems.value })
    })
  },
  { deep: true, immediate: true }
)

watch(
  () => props.schema?.initialValues,
  async (newVal) => {
    await nextTick()
    Object.assign(initialValues, cloneDeep(newVal))
  },
  { immediate: true }
)

watch(initialValues, async (newVal) => {
  await nextTick()
  formValues.value = merge(newVal, formValues.value)
})

const validate: FormInstance['validate'] = () => formRef.value?.validate()

const submit: FormInstance['submit'] = () => {
  validate()
    ?.then(() => {
      emit('finish', formValues.value)
    })
    .catch((e) => {
      emit('failed', e)
    })
}

const resetFields: FormInstance['resetFields'] = (names) => {
  emit('reset')
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

const updateFormValues: FormInstance['updateFormValues'] = (values) => {
  formValues.value = values
}

const updateSelectData: FormInstance['updateSelectData'] = (key, value) => {
  selectData[key] = value
}

const updateInitialValues: FormInstance['updateInitialValues'] = (values) => {
  Object.assign(initialValues, values)
}

const updateVCodePass = (value: boolean) => {
  vCodePass.value = value
}

const instance = readonly({
  ...toRefs(props),
  formValues,
  selectData,
  initialValues,
  context,
  vCodePass,
  updateFormValues,
  updateSelectData,
  updateInitialValues,
  updateVCodePass,
  validate,
  resetFields,
  submit
})

provide($formInstance, instance)

defineExpose(instance)
</script>
