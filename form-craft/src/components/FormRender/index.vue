<template>
  <el-form :model="formValues" ref="form" v-bind="formAttrs">
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
import { cloneDeep, omit } from 'lodash'
import {
  computed,
  onBeforeMount,
  provide,
  reactive,
  readonly,
  ref,
  toRefs,
  useSlots,
  useTemplateRef,
  watch
} from 'vue'
import { FormItemGroup } from '@/components'
import { useLocale } from '@/hooks'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps, FormSchema } from '@/types'
import { deepParse, getDataByPath, setDataByPath } from '@/utils'

const props = withDefaults(defineProps<FormRenderProps>(), {
  schema: () => ({})
})

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const locale = useLocale()

const form = useTemplateRef<ElFormInstance>('form')

const selectData = reactive<Record<string, Record<string, any>>>({})

// 内部维护的 schema 副本，避免直接修改 props
const internalSchema = ref<FormSchema>(cloneDeep(props.schema))

// 监听 props.schema 变化，同步到内部 schema
watch(
  () => props.schema,
  (newSchema) => {
    internalSchema.value = cloneDeep(newSchema)
  },
  { deep: true }
)

// ========== API 方法定义（需要在 context 之前定义） ==========
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

  form.value?.resetFields(names)
}

const updateSelectData: FormInstance['updateSelectData'] = (key, value) => {
  selectData[key] = value
}

const updateItemSchemaByPath: FormInstance['updateItemSchemaByPath'] = (name, path, value) => {
  // console.log('updateItemSchemaByPath', name, path, value)
  const findAndUpdate = (items: any[]): boolean => {
    for (const item of items) {
      if (item.name === name) {
        // 使用 setDataByPath 设置嵌套路径的值
        const updated = setDataByPath(item, path, value)
        Object.assign(item, updated)
        return true
      }
      if (item.children && findAndUpdate(item.children)) {
        return true
      }
    }
    return false
  }

  if (internalSchema.value.items) {
    findAndUpdate(internalSchema.value.items)
  }
}

const slots = useSlots()

// 创建 instanceAPI 对象，供 context 中的 $instance 使用
const instanceAPI = {
  getValues,
  setValues,
  getFieldValue,
  setFieldValue,
  updateSelectData,
  updateItemSchemaByPath,
  validate,
  resetFields,
  submit
}

// ========== Context 定义（包含 $instance） ==========
// 性能优化：使用shallowRef减少深层响应式开销
const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $instance: instanceAPI
}))

// 性能优化：缓存解析结果，只在schema或context变化时重新解析
const formItems = computed(() => {
  if (props.design) {
    return internalSchema.value.items
  }

  // deepParse已经有缓存机制，这里直接调用
  return deepParse(internalSchema.value.items || [], context.value)
})

const formAttrs = computed(() => {
  const attrs = omit(props.schema, [
    'model',
    'items',
    'submitBtn',
    'resetBtn',
    'initialValues',
    'labelAlign',
    'labelBold',
    'labelSuffix'
  ])

  return {
    ...attrs,
    labelPosition: props.schema.labelAlign
  }
})

onBeforeMount(() => {
  if (props.schema.initialValues) {
    const values = cloneDeep(props.schema.initialValues)

    formValues.value = { ...values, ...formValues.value }
  }
})

const instance = readonly({
  ...toRefs(props),
  selectData,
  context,
  getValues,
  setValues,
  getFieldValue,
  setFieldValue,
  updateSelectData,
  updateItemSchemaByPath,
  validate,
  resetFields,
  submit,
  slots
})

provide($formInstance, instance)

defineExpose(instance)
</script>
