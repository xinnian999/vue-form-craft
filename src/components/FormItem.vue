<template>
  <template v-if="!hidden">
    <div
      v-if="currentComponentConfig.isNotFormItem"
      :style="{
        marginBottom: design ? 0 : '18px'
      }"
      class="notFormItem"
    >
      <component :is="currentComponentConfig.component" v-bind="props">
        <template
          v-if="currentComponentConfig.isWrapper || currentComponentConfig.isDefaultWrapper"
        >
          <form-render
            v-if="currentComponent === 'ItemGroup'"
            v-model="value"
            :formItems="children"
            :name="name"
          />
          <form-render v-else v-model="formValues" :formItems="children" />
        </template>
      </component>
    </div>

    <el-form-item
      v-else
      id="form-item"
      :style="{ ...style, marginBottom: design ? 0 : '18px' }"
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

      <component
        :is="currentComponentConfig.component"
        v-model="value"
        v-bind="pickBy({ ...props, name, children }, Boolean)"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, onBeforeMount, inject } from 'vue'
import { ElFormItem, ElTooltip } from 'element-plus'
import { isString, pickBy } from 'lodash'
import { isRegexString } from '@/utils'
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
  hidden: Boolean,
  hideLabel: Boolean,
  prop: String,
  onlyId: String,
  rules: Array,
  class: null,
  design: Boolean
})

const emit = defineEmits(['update:modelValue'])

const elements = inject('$elements')

const schema = inject('$schema')

const formValues = thisProps.design ? {} : inject('$formValues')

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

const currentComponentConfig = computed(() => {
  return elements[currentComponent.value] || {}
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

.notFormItem {
}
</style>
