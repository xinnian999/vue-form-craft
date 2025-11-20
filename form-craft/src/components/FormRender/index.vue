<template>
  <el-form :model="formValues" ref="form" v-bind="formAttrs">
    <slot />

    <FormItemGroup :list="parseSchema.items" />

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
import { computed, onBeforeMount, provide, reactive, readonly, toRefs, useTemplateRef } from 'vue'
import { FormItemGroup } from '@/components'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps } from '@/types'
import { deepParse, filterExpressions, getDataByPath, setDataByPath } from '@/utils'

const props = withDefaults(defineProps<FormRenderProps>(), {
  schema: () => ({})
})

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const form = useTemplateRef<ElFormInstance>('form')

const selectData = reactive<Record<string, Record<string, any>>>({})

// ========== API 方法定义（需要在 context 之前定义） ==========
const getValues: FormInstance['getValues'] = () => formValues.value

const setValues: FormInstance['setValues'] = (values) => {
  formValues.value = values
}

const getFieldValue: FormInstance['getFieldValue'] = (path) => getDataByPath(getValues(), path)

const setFieldValue: FormInstance['setFieldValue'] = async (path, value) => {
  emits('fieldChange', path, value)
  setDataByPath(getValues(), path, value)
  // 再次赋值确保v-model响应式更新
  setValues(cloneDeep(getValues()))
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

const setFieldAttr: FormInstance['setFieldAttr'] = (name, path, value) => {
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

  if (props.schema.items) {
    findAndUpdate(props.schema.items)
  }
}

// 创建 instanceAPI 对象，供 context 中的 $instance 使用
const instanceAPI = {
  getValues,
  setValues,
  getFieldValue,
  setFieldValue,
  updateSelectData,
  setFieldAttr,
  validate,
  resetFields,
  submit
}

// ========== Context 定义（包含 $instance） ==========
const context = computed(() => ({
  ...props.schemaContext,
  $values: formValues.value,
  $selectData: selectData,
  $instance: instanceAPI
}))

// 全局schema解析，使用模板引擎处理所有字段中的表达式
const parseSchema = computed(() => {
  // 设计模式下直接返回原始schema，不进行表达式解析
  if (props.design) {
    return props.schema
  }
  // 运行模式下解析表达式
  return deepParse(props.schema, context.value)
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

    setValues({ ...values, ...formValues.value })
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
  setFieldAttr,
  validate,
  resetFields,
  submit
})

provide($formInstance, instance)

defineExpose(instance)
</script>
