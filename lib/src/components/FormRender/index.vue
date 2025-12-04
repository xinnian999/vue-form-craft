<template>
  <Form :model="formValues" ref="form" v-bind="formAttrs" :data-form-id="formId">
    <slot />

    <FormItemGroup :list="parseSchema.items" />

    <FormItem v-if="!design && !read">
      <el-button v-if="schema.submitBtn" type="primary" @click="instance.submit" name="submit-btn">
        提交
      </el-button>
      <el-button v-if="schema.resetBtn" @click="() => instance.resetFields()" name="reset-btn">
        重置
      </el-button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import type { FormInstance as ElFormInstance } from 'element-plus'
import { cloneDeep, omit } from 'lodash'
import {
  computed,
  h,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  reactive,
  readonly,
  ref,
  toRefs,
  useTemplateRef,
  watch
} from 'vue'
import { useUI } from '@/hooks'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps } from '@/types'
import { deepParse, getDataByPath, setDataByPath } from '@/utils'
import FormItemGroup from './FormItemGroup/index.vue'

const { Form, FormItem } = useUI()

const props = withDefaults(defineProps<FormRenderProps>(), {
  schema: () => ({})
})

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const form = useTemplateRef<ElFormInstance>('form')

const selectData = reactive<Record<string, Record<string, any>>>({})

// ========== Schema 数据流策略 ==========
// 【核心宗旨】
// 1. 非 design 模式（运行模式）：
//    - props.schema 响应式更新，支持动态切换表单
//    - 内部维护深拷贝副本，所有运行时修改（setFieldAttr 等）只影响内部副本，不污染外部
//    - 当 props.schema 变化时，重新深拷贝并更新内部副本
// 2. design 模式（设计模式）：
//    - props.schema 双向绑定，要求外部传入响应式对象（ref/reactive）
//    - 实时追踪 props.schema 的变化（通过 computed）
//    - 内部修改（setFieldAttr、draggable 等）直接作用到 props.schema

// 运行模式下的 schema 副本（响应 props.schema 变化）
const staticSchema = props.design ? null : ref(cloneDeep(props.schema || {}))

// 运行模式下监听 props.schema 变化，重新深拷贝
// 注意：不需要 deep 监听，因为切换表单时一般是整个替换 schema 引用
if (!props.design) {
  watch(
    () => props.schema,
    (newSchema) => {
      staticSchema!.value = cloneDeep(newSchema || {})
    }
  )
}

const innerSchema = computed(() => {
  if (props.design) {
    // 设计模式：直接返回 props.schema，实时追踪外部变化，允许双向修改
    return props.schema
  } else {
    // 运行模式：返回深拷贝的副本，与外部隔离但响应外部变化
    return staticSchema!.value
  }
})

// 生成唯一的 formId（只在首次生成，后续保持不变）
let autoFormId = `fm-form-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const formId = computed(() => {
  return innerSchema.value.formId || props.schema.formId || autoFormId
})

// 样式元素引用
const styleElement = ref<HTMLStyleElement | null>(null)

// 统一的事件触发器：同时触发 emits 和 schema 事件
const trigger = (eventName: keyof FormRenderEmits, ...args: any[]) => {
  ;(emits as any)(eventName, ...args)
  const schemaEventName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`
  const handler = (innerSchema.value as any)[schemaEventName]
  handler?.(...args)
}

// ========== API 方法定义（需要在 context 之前定义） ==========
const getValues: FormInstance['getValues'] = () => formValues.value

const setValues: FormInstance['setValues'] = (values) => {
  formValues.value = values
  trigger('change', values)
}

const getFieldValue: FormInstance['getFieldValue'] = (path) => getDataByPath(getValues(), path)

const setFieldValue: FormInstance['setFieldValue'] = async (path, value) => {
  setDataByPath(getValues(), path, value)
  // 再次赋值确保v-model响应式更新
  setValues(cloneDeep(getValues()))

  trigger('fieldChange', path, value)
}

const validate: FormInstance['validate'] = () => form.value!.validate()

const submit: FormInstance['submit'] = () => {
  validate()
    ?.then(() => {
      trigger('finish', formValues.value)
    })
    .catch((e) => {
      trigger('failed', e)
    })
}

const resetFields: FormInstance['resetFields'] = (names) => {
  trigger('reset')

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

  if (innerSchema.value.items) {
    findAndUpdate(innerSchema.value.items)
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
  $instance: instanceAPI,
  h
}))

// 全局schema解析，使用模板引擎处理所有字段中的表达式
const parseSchema = computed(() => {
  // 设计模式下直接返回原始schema，不进行表达式解析
  if (props.design) {
    return innerSchema.value
  }
  // 运行模式下解析表达式
  return deepParse(innerSchema.value, context.value)
})

const formAttrs = computed(() => {
  const attrs = omit(parseSchema.value, [
    'model',
    'items',
    'submitBtn',
    'resetBtn',
    'initialValues',
    'colon',
    'onFieldChange',
    'onChange'
  ])

  return attrs
})

// 监听 styleBlock 变化，实时更新样式（设计模式下可实时预览）
watch(
  () => innerSchema.value.styleBlock,
  (newStyleBlock) => {
    // 先清理旧的样式元素
    if (styleElement.value && styleElement.value.parentNode) {
      styleElement.value.parentNode.removeChild(styleElement.value)
      styleElement.value = null
    }

    // 如果有新样式，注入
    if (newStyleBlock) {
      styleElement.value = document.createElement('style')
      styleElement.value.setAttribute('data-form-style', formId.value)
      // 自动包裹作用域选择器，用户不需要手动写 [data-form-id]
      const cssText = `[data-form-id="${formId.value}"] {\n${newStyleBlock}\n}`
      styleElement.value.textContent = cssText
      document.head.appendChild(styleElement.value)
    }
  },
  { immediate: true }
)

onBeforeMount(() => {
  if (!props.design && innerSchema.value.initialValues) {
    const values = cloneDeep(innerSchema.value.initialValues)

    setValues({ ...values, ...formValues.value })
  }
})

onBeforeUnmount(() => {
  // 清理样式元素
  if (styleElement.value && styleElement.value.parentNode) {
    styleElement.value.parentNode.removeChild(styleElement.value)
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
