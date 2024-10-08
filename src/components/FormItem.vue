<template>
  <template v-if="design || !hidden">
    <div v-if="config.type === 'layout'" :style="itemStyle">
      <component
        :is="config.component"
        :design="design"
        :name="name"
        :props="props"
        :children="children"
      />
    </div>

    <el-form-item
      v-else
      id="form-item"
      :style="itemStyle"
      :key="name"
      :prop="name"
      :label-width="hideLabel ? '0' : schema.labelWidth"
      :rules="computeRules"
      :class="thisProps.class"
    >
      <template #label>
        <div v-if="!hideLabel" class="form-item-label">
          <div :style="schema.labelBold && 'font-weight: bold'">{{ label }}</div>
          <div class="ico" v-if="help">
            <el-tooltip class="box-item" effect="dark" :content="help">
              <div><icon-render name="help" /></div>
            </el-tooltip>
          </div>
          <div class="suffix" v-if="schema.labelSuffix">
            {{ schema.labelSuffix }}
          </div>
        </div>
      </template>

      <!-- 弹窗展示复杂组件 -->
      <template v-if="dialog">
        <el-dialog
          v-model="dialogState.visible"
          :title="dialogState.title"
          width="70%"
          center
          destroy-on-close
        >
          <component
            :is="config.component"
            :disabled="schema.disabled"
            :size="schema.size"
            v-bind="formItemProps"
            v-model:[config.modelName!]="value"
            :design="design"
            :read="read"
          />
        </el-dialog>

        <el-button type="primary" plain @click="handleDialog">配置</el-button>
      </template>

      <component
        v-else
        :is="config.component"
        :disabled="schema.disabled"
        :size="schema.size"
        v-bind="formItemProps"
        v-model:[config.modelName!]="value"
        :design="design"
        :read="read"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive, watch, type Ref } from 'vue'
import { isRegexString, getDataByPath, setDataByPath } from '@vue-form-craft/utils'
import { $global, $schema, $formValues, $initialValues } from '@vue-form-craft/config/symbol'
import type { FormItemType } from '@vue-form-craft/config/commonType'
import { IconRender } from '@vue-form-craft/components'

const thisProps = defineProps<FormItemType>()

const { elements } = inject($global)!

const { schema } = inject($schema)!

const read = inject('vfc-read')!

const { formValues, updateFormValues } = inject($formValues)!

const { initialValues, updateInitialValues } = inject($initialValues)!

const dialogState = reactive({
  visible: false,
  title: ''
})

const handleDialog = () => {
  dialogState.visible = true
  dialogState.title = thisProps.label!
}

const value = computed({
  get() {
    return getDataByPath(formValues.value, thisProps.name)
  },
  set(val) {
    const newValues = setDataByPath(formValues.value, thisProps.name, val)
    updateFormValues(newValues)
  }
})

const itemStyle = computed(() => ({
  marginBottom: thisProps.design ? 0 : '18px',
  ...thisProps.style
}))

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

const config = computed(() => {
  const data = elements[thisProps.component] || {}
  if (!data.modelName) {
    data.modelName = 'modelValue'
  }

  return data
})

const formItemProps = computed(() => {
  const initProps: Record<string, any> = {
    ...thisProps.props,
    name: thisProps.name
  }

  if (thisProps.children) {
    initProps.children = thisProps.children
  }

  return initProps
})

onMounted(() => {
  if (!value.value && thisProps.initialValue !== undefined && !thisProps.design) {
    const newInitialValues = setDataByPath(initialValues, thisProps.name, thisProps.initialValue)
    updateInitialValues(newInitialValues)
  }
})

// watch(
//   () => thisProps.initialValue,
//   (newVal) => {
//     if (read) {
//       value.value = newVal
//     }
//   },
//   { immediate: true }
// )
</script>

<style lang="less">
#form-item {
  .form-item-label {
    display: flex;
    position: relative;
    white-space: nowrap;
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
    .suffix {
      margin-left: 3px;
    }
  }
}
</style>
