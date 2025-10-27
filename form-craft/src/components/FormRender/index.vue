<template>
  <el-form
    :class="ns('form')"
    :model="formValues"
    :label-position="schema.labelAlign"
    ref="form"
    v-bind="{ ...$attrs, ...schema }"
  >
    <slot />

    <FormItemGroup
      :children="formItems"
      designKey="root"
      :empty-text="locale.canvas.emptyTip"
      :empty-size="18"
    />

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
import {
  computed,
  onMounted,
  provide,
  reactive,
  readonly,
  toRefs,
  useSlots,
  useTemplateRef
} from 'vue'
import { FormItemGroup } from '@/components'
import { useLocale } from '@/hooks'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps } from '@/types'
import { deepParse, getDataByPath, ns, setDataByPath } from '@/utils'

const props = withDefaults(defineProps<FormRenderProps>(), {
  schema: () => ({ items: [] })
})

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const locale = useLocale()

const form = useTemplateRef<ElFormInstance>('form')

const selectData = reactive<Record<string, Record<string, any>>>({})

const initialValues = reactive<Record<string, any>>({})

const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $locale: locale.value
}))

const formItems = computed(() => {
  if (props.design) {
    return props.schema.items
  }

  return deepParse(props.schema.items || [], context.value)
})

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

const getValues: FormInstance['getValues'] = () => formValues.value

const setValues: FormInstance['setValues'] = (values) => {
  formValues.value = values
}

const getFieldValue: FormInstance['getFieldValue'] = (path) => getDataByPath(getValues(), path)

const setFieldValue: FormInstance['setFieldValue'] = (path, value) => {
  const newValues = setDataByPath(getValues(), path, value)
  setValues(newValues)
}

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

const updateSelectData: FormInstance['updateSelectData'] = (key, value) => {
  selectData[key] = value
}

const updateInitialValues: FormInstance['updateInitialValues'] = (values) => {
  Object.assign(initialValues, values)
}

const slots = useSlots()

console.log(slots)

const instance = readonly({
  ...toRefs(props),
  selectData,
  initialValues,
  context,
  getValues,
  setValues,
  getFieldValue,
  setFieldValue,
  updateSelectData,
  updateInitialValues,
  validate,
  resetFields,
  submit,
  slots
})

provide($formInstance, instance)

defineExpose(instance)
</script>
