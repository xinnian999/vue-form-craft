<template>
  <Form :model="formValues" ref="form" v-bind="formAttrs" :data-form-id="formId">
    <slot />

    <FormItemGroup :list="parseSchema.items" designKey="root" />

    <FormItem v-if="!design && !read && (formAttrs.submitBtn || formAttrs.resetBtn)" label=" ">
      <div style="display: flex; gap: 15px">
        <Button
          v-if="formAttrs.submitBtn"
          type="primary"
          @click="instance.submit"
          name="submit-btn"
        >
          提交
        </Button>
        <Button v-if="formAttrs.resetBtn" @click="() => instance.resetFields()" name="reset-btn">
          重置
        </Button>
      </div>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import type { FormSchema } from 'dist'
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
import { useDesignInstance, useUI } from '@/hooks'
import { $formInstance } from '@/symbol'
import type { FormInstance, FormRenderEmits, FormRenderProps } from '@/types'
import type { FormProtocol } from '@/types/uiAdapter'
import { deepParse, getDataByPath, setDataByPath } from '@/utils'
import FormItemGroup from './FormItemGroup/index.vue'

const { Form, FormItem, Button } = useUI()

const props = withDefaults(defineProps<FormRenderProps>(), {
  schema: () => ({})
})

const emits = defineEmits<FormRenderEmits>()

// 注意：默认值必须使用工厂函数返回新对象，避免跨实例共享
const formValues = defineModel<Record<string, any>>({ default: () => reactive({}) })

const form = useTemplateRef<FormProtocol['expose']>('form')

const selectData = reactive<Record<string, Record<string, any>>>({})

// 复制schema，避免直接修改props
const innerSchema = ref(cloneDeep(props.schema || {}))

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

// 直接修改 formValues
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
  let schema: FormSchema

  if (props.design) {
    // 设计模式下，与设计Schema桥接
    const designInstance = useDesignInstance()
    schema = designInstance!.getSchema()
  } else {
    schema = parseSchema.value
  }

  const attrs = omit(
    {
      labelWidth: 150,
      labelAlign: 'right',
      scrollToError: true,
      size: 'default',
      submitBtn: true,
      ...schema
    },
    ['model', 'items', 'initialValues', 'colon', 'onFieldChange', 'onChange']
  )

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
