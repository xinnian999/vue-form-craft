<template>
  <el-card v-if="currentComponent === 'Card'" v-bind="props" class="form-item-group">
    <form-render v-model="formValues" :formItems="children" />
  </el-card>

  <div
    v-else-if="['grid', 'inline'].includes(currentComponent)"
    class="form-item-group"
    :style="layoutBoxStyle"
  >
    <form-render v-model="formValues" :formItems="children" />
  </div>

  <item-group
    v-else-if="currentComponent === 'itemGroup'"
    v-model="value"
    :children="children"
    :name="name"
  />

  <el-form-item
    v-else
    id="form-item"
    :style="style"
    :key="name"
    :prop="prop || name"
    :label-width="hideLabel ? '0' : schema.labelWidth"
    :rules="computeRules"
    :class="thisProps.class"
  >
    <template #label v-if="!hideLabel">
      <div class="form-item-label">
        <div :style="schema.labelBold && 'font-weight: bold'">{{ label }}</div>
        <div class="ico" v-if="help">
          <el-tooltip class="box-item" effect="dark" :content="help">
            <icon-render name="help" />
          </el-tooltip>
        </div>
      </div>
    </template>
    <!-- 
    <el-input
      v-if="currentComponent === 'Input'"
      v-model="value"
      autocomplete="off"
      v-bind="props"
      class="form-item-input"
      showWordLimit
      type="text"
    />

    <el-input
      v-else-if="currentComponent === 'password'"
      v-model="value"
      autocomplete="off"
      show-password
      v-bind="props"
      type="password"
      showWordLimit
      class="form-item-input"
    />

    <el-input
      v-else-if="currentComponent === 'textarea'"
      v-model="value"
      autocomplete="off"
      v-bind="props"
      type="textarea"
      showWordLimit
      class="form-item-input"
    />

    <InputNumber v-else-if="currentComponent === 'inputNumber'" v-model="value" v-bind="props" />

    <Select v-else-if="currentComponent === 'select'" v-model="value" v-bind="props" :name="name" />

    <Radio v-else-if="currentComponent === 'radio'" v-model="value" v-bind="props" :name="name" />

    <Checkbox
      v-else-if="currentComponent === 'checkbox'"
      v-model="value"
      v-bind="props"
      :name="name"
    />

    <Cascader
      v-else-if="currentComponent === 'cascader'"
      v-model="value"
      v-bind="props"
      :name="name"
    />

    <JsonEdit
      v-else-if="currentComponent === 'jsonEdit'"
      v-model="value"
      v-bind="props"
      :name="name"
    />

    <el-color-picker
      v-else-if="currentComponent === 'colorPicker'"
      v-model="value"
      v-bind="props"
    />

    <el-switch v-else-if="currentComponent === 'Switch'" v-model="value" v-bind="props" />

    <Button v-else-if="currentComponent === 'button'" type="primary" v-bind="props">{{
      label
    }}</Button>

    <MdEditor v-else-if="currentComponent === 'markdown'" v-model="value" v-bind="props" />

    <el-alert v-else-if="currentComponent === 'alert'" v-bind="props" />

    <el-date-picker v-else-if="currentComponent === 'datePicker'" v-model="value" v-bind="props" />

    <UploadImage v-else-if="currentComponent === 'uploadImage'" v-model="value" v-bind="props" />

    <ElRate v-else-if="currentComponent === 'rate'" v-model="value" v-bind="props" />

    <Title v-else-if="currentComponent === 'title'" v-bind="props" />

    <form-list
      v-else-if="currentComponent === 'formList'"
      v-model="value"
      v-bind="props"
      :children="children"
      :title="label"
      :name="name"
    />

    <div v-else-if="currentComponent === 'text'">
      {{ props.formatter || value }}
    </div> -->

    <component
      v-if="currentComponent === 'custom'"
      :is="props.componentName"
      v-model="value"
      v-bind="props"
    />

    <component v-else :is="elements[currentComponent]?.component" v-model="value" v-bind="props" />
  </el-form-item>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, onBeforeMount, inject } from 'vue'
import {
  ElFormItem,
  ElInput,
  ElTooltip,
  ElColorPicker,
  ElSwitch,
  ElAlert,
  ElDatePicker,
  ElRate,
  ElCard
} from 'element-plus'
import { isString } from 'lodash'
import { MdEditor } from 'md-editor-v3'
import { isRegexString } from '@/utils'
import {
  Select,
  Radio,
  InputNumber,
  Checkbox,
  Cascader,
  JsonEdit,
  Button,
  UploadImage,
  Title,
  FormList,
  ItemGroup
} from '@/components'
import useStyle from '@/hooks/useStyle'
import FormRender from './FormRender.vue'

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  style: Object,
  help: String,
  children: Array,
  hideLabel: Boolean,
  prop: String,
  rules: Array,
  class: null
})

const emit = defineEmits(['update:modelValue'])

const elements = inject('$elements')

const schema = inject('$schema')

const formValues = inject('$formValues')

const layoutBoxStyle = useStyle(thisProps.component, thisProps.props)

const value = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const computeRules = computed(() => {
  const { rules, required } = thisProps

  const ruleData = []

  if (required) {
    ruleData.push({ required: true, message: '该字段是必填字段', trigger: 'blur' })
  }

  if (rules) {
    const ruleParse = rules.map(({ type, message, trigger }) => {
      const ruleDef = {
        message,
        trigger
      }
      if (['email'].includes(type)) {
        return { ...ruleDef, type }
      }
      if (isRegexString(type)) {
        return {
          ...ruleDef,
          pattern: type
        }
      }
      return {}
    })
    return [...ruleData, ...ruleParse]
  }

  return ruleData
})

const currentComponent = computed(() => {
  if (isString(value.value) && /^{{\s*(.*?)\s*}}$/.test(value.value)) {
    return 'Input'
  }

  return thisProps.component
})

onBeforeMount(() => {
  if (!value.value && (thisProps.initialValue || thisProps.initialValue === 0)) {
    emit('update:modelValue', thisProps.initialValue)
  }
})
</script>

<style lang="less">
#form-item {
  .form-item-label {
    display: flex;
    position: relative;
    .ico {
      margin-left: 3px;
      font-size: 15px;
      position: relative;
    }
  }
}

.form-item-group {
  margin-bottom: 20px;
}
</style>
