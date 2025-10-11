<template>
  <el-form
    :class="ns('form')"
    :model="formValues"
    :label-position="schema.labelAlign"
    ref="form"
    v-bind="{ ...$attrs, ...schema }"
  >
    <slot />

    <FormItemGroup :list="formItems" :empty-text="locale.canvas.emptyTip" :empty-size="18" />

    <el-form-item v-if="!design && !read">
      <el-button v-if="schema.submitBtn" type="primary" @click="instance.submit" name="submit-btn">
        提交
      </el-button>
      <el-button v-if="schema.resetBtn" @click="() => instance.resetFields()" name="reset-btn">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance as ElFormInstance } from 'element-plus'
import { cloneDeep, mergeWith } from 'lodash'
import { computed, onMounted, provide, reactive, readonly, toRefs, useTemplateRef } from 'vue'
import { FormItemGroup } from '@/components'
import { useLocale } from '@/hooks'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps, FormSchema } from '@/types'
import { deepParse, getDataByPath, ns, setDataByPath } from '@/utils'

const props = defineProps<FormRenderProps>()

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const schema = defineModel<FormSchema>('schema', {
  default: () =>
    reactive({
      labelWidth: 150,
      labelAlign: 'right',
      scrollToError: true,
      size: 'default',
      items: []
    })
})

const locale = useLocale()

const form = useTemplateRef<ElFormInstance>('form')

const formItems = computed({
  get() {
    if (props.design) {
      return schema.value.items
    }

    return deepParse(props.schema.items || [], context.value)
  },
  set(values) {
    schema.value = {
      ...schema.value,
      items: values
    }
  }
})

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $locale: locale.value
}))

// 支持从schema初始化默认值对象
onMounted(() => {
  if (props.schema?.initialValues) {
    const initialValues = cloneDeep(props.schema?.initialValues)

    formValues.value = mergeWith(initialValues, formValues.value, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return srcValue // 不深度合并数组
      }
    })
  }
})

const validate: FormInstance['validate'] = () => form.value!.validate()

const submit: FormInstance['submit'] = () => {
  validate()
    ?.then(() => {
      emits('finish', formValues.value)
    })
    .catch((e) => {
      emits('failed', e)
    })
}

const resetFields: FormInstance['resetFields'] = (names) => {
  emits('reset')

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
  Object.assign(formValues.value, values)
}

const updateSelectData: FormInstance['updateSelectData'] = (key, value) => {
  selectData[key] = value
}

const updateInitialValues: FormInstance['updateInitialValues'] = (values) => {
  Object.assign(initialValues, values)
}

const instance = readonly({
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
})

provide($formInstance, instance)

defineExpose(instance)
</script>
