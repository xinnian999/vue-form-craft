<template>
  <template v-if="design || !hidden">
    <div v-if="config.type === 'layout'" class="notFormItem">
      <component :is="config.component" v-bind="thisProps" v-model="parentValue" />
    </div>

    <div v-else-if="config.type === 'assist'" :style="{ marginBottom: design ? 0 : '18px' }">
      <component :is="config.component" v-bind="props" />
    </div>

    <div v-else-if="component === 'ItemGroup'" class="notFormItem">
      <component :is="config.component" v-bind="thisProps" v-model="value" />
    </div>

    <el-form-item
      v-else
      id="form-item"
      :style="{ marginBottom: design ? 0 : '18px', ...style }"
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
        :is="config.component"
        :disabled="schema.disabled"
        :size="schema.size"
        v-bind="pickBy({ ...props, name, children }, Boolean)"
        v-model="value"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits, onBeforeMount, inject, onMounted, nextTick } from 'vue'
import { ElFormItem, ElTooltip } from 'element-plus'
import { isString, pickBy } from 'lodash'
import { isRegexString } from '@/utils'

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
  design: Boolean,
  parentValue: Object
})

const emit = defineEmits(['update:modelValue', 'update:parentValue'])

const elements = inject('$elements')

const schema = inject('$schema')

const value = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const parentValue = computed({
  get() {
    return thisProps.parentValue
  },
  set(val) {
    emit('update:parentValue', val)
  }
})

const computeRules = computed(() => {
  const { rules, required } = thisProps

  const ruleData = []

  if (required) {
    ruleData.push({ required: true, message: '该字段是必填字段', trigger: 'blur' })
  }

  if (rules) {
    const ruleParse = rules.map(({ type, message, trigger, customReg }) => {
      const ruleDef = {
        message,
        trigger
      }
      if (['email', 'url'].includes(type)) {
        return { ...ruleDef, type }
      }
      if (type === 'custom') {
        return {
          ...ruleDef,
          pattern: customReg
        }
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

const config = computed(() => {
  return elements[currentComponent.value] || {}
})

onBeforeMount(() => {
  // TODO:el-switch的modelValue提前赋值会引发未知BUG,暂时推到dom挂载后再赋值（但是表单重置会失效）
  if (currentComponent.value === 'Switch') {
    return nextTick(() => {
      emit('update:modelValue', thisProps.initialValue)
    })
  }

  if ((!value.value && thisProps.initialValue) || thisProps.initialValue === 0) {
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
  margin-bottom: 18px;
}
</style>
