<template>
  <el-form
    :model="form"
    :label-position="props.schema?.labelAlign"
    :size="props.schema?.size"
    ref="formRef"
  >
    <FormRender v-model="form" :formItems="formItems" />
  </el-form>
</template>

<script setup lang="jsx">
import {
  ref,
  defineProps,
  defineExpose,
  defineEmits,
  computed,
  reactive,
  provide,
  watch
} from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { handleLinkages, deepParse } from '../utils'
import FormRender from './FormRender.vue'

const formRef = ref(null)

const props = defineProps({
  // 表单数据源，双向绑定
  modelValue: {
    type: Object
  },
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ items: [] })
  },
  request: {
    type: Function,
    default: axios
  }
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const selectData = reactive({})

// 转换为动态配置
const formItems = computed(() => {
  const context = {
    $values: form.value,
    $form: form.value,
    $selectData: selectData,
    $utils: {}
  }
  return deepParse(props.schema.items, context)
})

const submit = async () => {
  try {
    await formRef.value.validate()
    //转化成普通对象，便于阅读
    return { ...form.value }
  } catch (e) {
    ElMessage.error('表单填写校验不通过！')
    return Promise.reject(e)
  }
}

watch(
  form,
  (newVal, oldVal) => {
    handleLinkages({ newVal, oldVal, form, formItems: formItems.value })
  },
  { deep: true }
)

provide('$schema', props.schema)
provide('$selectData', selectData)

provide('$request', props.request)

defineExpose({ submit, selectData })
</script>
