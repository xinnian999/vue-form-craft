<template>
  <el-form-item
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

    <el-input
      v-if="currentComponent === 'input'"
      v-model="value"
      autocomplete="off"
      v-bind="props"
      class="form-item-input"
      showWordLimit
      type="text"
    />

    <el-input
      v-if="currentComponent === 'password'"
      v-model="value"
      autocomplete="off"
      show-password
      v-bind="props"
      type="password"
      showWordLimit
      class="form-item-input"
    />

    <el-input
      v-if="currentComponent === 'textarea'"
      v-model="value"
      autocomplete="off"
      v-bind="props"
      type="textarea"
      showWordLimit
      class="form-item-input"
    />

    <InputNumber v-model="value" v-bind="props" v-if="currentComponent === 'inputNumber'" />

    <Select v-if="currentComponent === 'select'" v-model="value" v-bind="props" :name="name" />

    <Radio v-model="value" v-bind="props" v-if="currentComponent === 'radio'" :name="name" />

    <Checkbox v-if="currentComponent === 'checkbox'" v-model="value" v-bind="props" :name="name" />

    <Cascader v-if="currentComponent === 'cascader'" v-model="value" v-bind="props" :name="name" />

    <JsonEdit v-if="currentComponent === 'jsonEdit'" v-model="value" v-bind="props" :name="name" />

    <el-color-picker v-if="currentComponent === 'colorPicker'" v-model="value" v-bind="props" />

    <el-switch v-if="currentComponent === 'switch'" v-model="value" v-bind="props" />

    <Button v-if="currentComponent === 'button'" type="primary" v-bind="props">{{ label }}</Button>

    <MdEditor v-if="currentComponent === 'markdown'" v-model="value" v-bind="props" />

    <el-alert v-if="currentComponent === 'alert'" v-bind="props" />

    <el-date-picker v-if="currentComponent === 'datePicker'" v-model="value" v-bind="props" />

    <UploadImage v-if="currentComponent === 'uploadImage'" v-model="value" v-bind="props" />

    <ElRate v-if="currentComponent === 'rate'" v-model="value" v-bind="props" />

    <Title v-if="currentComponent === 'title'" v-bind="props" />

    <component
      v-if="currentComponent === 'custom'"
      :is="props.componentName"
      v-model="value"
      v-bind="props"
    ></component>

    <div v-if="currentComponent === 'text'">
      {{ props.formatter || value }}
    </div>

    <slot />
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
  ElRate
} from 'element-plus'
import { isString } from 'lodash'
import { MdEditor } from 'md-editor-v3'
import Select from './basic/Select.vue'
import Radio from './basic/Radio.vue'
import InputNumber from './basic/InputNumber.vue'
import Checkbox from './basic/Checkbox.vue'
import Cascader from './basic/Cascader.vue'
import JsonEdit from './basic/JsonEdit.vue'
import Button from './basic/Button.vue'
import { isRegexString } from '@/utils'
import UploadImage from './basic/UploadImage.vue'
import Title from './basic/Title.vue'

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

const schema = inject('$schema')

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
    return 'input'
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
  .el-form-item__label {
  }

  .form-item-input {
    // max-width: 400px;
  }
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
</style>
