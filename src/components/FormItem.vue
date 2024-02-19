<template>
  <template v-if="design || !hidden">
    <div v-if="config.type === 'layout'" class="notFormItem" :style="style">
      <component :is="config.component" v-bind="thisProps" />
    </div>

    <div
      v-else-if="config.type === 'assist'"
      :style="{ marginBottom: design ? 0 : '18px', ...style }"
    >
      <component :is="config.component" v-bind="props" />
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
              <div><icon-render name="help" /></div>
            </el-tooltip>
          </div>
        </div>
      </template>

      <component
        :is="config.component"
        :disabled="schema.disabled"
        :size="schema.size"
        v-bind="formItemProps"
        v-model:[config.modelName]="value"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="jsx">
import { computed, defineProps, onBeforeMount, inject, nextTick, onMounted } from 'vue'
import { ElFormItem, ElTooltip } from 'element-plus'
import { isString } from 'lodash'
import { isRegexString, getDataByPath, setDataByPath } from '@/utils'

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
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
  change: Array
})

const { elements } = inject('$options')

const schema = inject('$schema')

const formValues = inject('$formValues')

const setValue = (newVal) => {
  // console.log(newVal)
  // console.log(setDataByPath(formValues.value, thisProps.name, newVal))
  formValues.value = setDataByPath(formValues.value, thisProps.name, newVal)
}

const value = computed({
  get() {
    return getDataByPath(formValues.value, thisProps.name)
  },
  set(val) {
    setValue(val)
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

const formItemProps = computed(() => {
  const initProps = {
    ...thisProps.props,
    name: thisProps.name
  }
  if (thisProps.children) {
    initProps.children = thisProps.children
  }

  return initProps
})

// onBeforeMount(() => {
//   if (!value.value && thisProps.initialValue !== undefined) {
//     // console.log(thisProps.name, thisProps.initialValue)

//     // TODO:el部分组件提前赋值会引发BUG,暂时推到dom挂载后再赋值（但是表单重置会失效）
//     if (['Switch', 'Select'].includes(currentComponent.value)) {
//       nextTick(() => {
//         setValue(thisProps.initialValue)
//       })
//     } else {
//       setValue(thisProps.initialValue)
//     }
//   }
// })

onMounted(() => {
  if (!value.value && thisProps.initialValue !== undefined) {
    setValue(thisProps.initialValue)
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
      .el-tooltip__trigger {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}

.notFormItem {
  margin-bottom: 18px;
}
</style>
