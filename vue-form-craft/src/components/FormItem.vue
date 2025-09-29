<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="[ns('form-item'), props.class]" :style="style">
      <component :is="config.render" v-bind="formItemProps" />
    </div>

    <el-form-item
      v-else
      :class="[ns('form-item'), props.class, `${component}-${name}`]"
      :style="style"
      :key="name"
      :prop="name"
      :label-width="hideLabel ? '0' : formInstance.schema.labelWidth"
      :rules="computeRules"
    >
      <template #label v-if="!hideLabel">
        <div :class="[ns('form-item-label'), label && `${name}-label`]">
          <div :style="formInstance.schema.labelBold && 'font-weight: bold'">{{ label }}</div>
          <el-tooltip effect="dark" :content="help" raw-content v-if="help">
            <Icon name="help" />
          </el-tooltip>
          <div :class="ns('form-item-label-suffix')" v-if="formInstance.schema.labelSuffix">
            {{ formInstance.schema.labelSuffix }}
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
            :is="config.render"
            :disabled="formInstance.schema.disabled"
            :size="formInstance.schema.size"
            v-bind="formItemProps"
            v-model:[config.modelName!]="value"
          />
        </el-dialog>

        <el-button type="primary" plain @click="handleDialog">配置</el-button>
      </template>

      <component
        v-else
        :is="config.render"
        :disabled="formInstance.schema.disabled"
        :size="formInstance.schema.size"
        v-bind="formItemProps"
        v-model:[config.modelName!]="value"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import type { FormItemRule } from 'element-plus'
import { cloneDeep, isEqual } from 'lodash'
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { useElements, useFormInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import type { FormItemType } from '@/types'
import { getDataByPath, isRegexString, ns, parseRegexString, setDataByPath } from '@/utils'

const props = defineProps<FormItemType>()

const formInstance = useFormInstance()

const elements = useElements()

const dialogState = reactive({
  visible: false,
  title: ''
})

const handleDialog = () => {
  dialogState.visible = true
  dialogState.title = props.label!
}

const value = computed({
  get() {
    return getDataByPath(formInstance.formValues, props.name)
  },
  set(val) {
    const newValues = setDataByPath(formInstance.formValues, props.name, val)
    formInstance.updateFormValues(newValues)
  }
})

const computeRules = computed(() => {
  const { rules, required } = props

  const ruleData: FormItemRule[] = []

  if (required) {
    ruleData.push({ required: true, message: '该字段是必填字段', trigger: 'blur' })
  }

  if (rules) {
    rules.forEach((rule) => {
      const { expr, message = '校验不通过', trigger = 'blur' } = rule

      const ruleDef = {
        message,
        trigger
      }

      // 解析字符串的正则
      if (isRegexString(expr)) {
        ruleData.push({
          ...ruleDef,
          pattern: parseRegexString(expr)
        })
        return
      }

      ruleData.push({
        ...ruleDef,
        validator: () => !!expr
      })
    })
  }

  return ruleData
})

const config = computed(() => {
  const data = elements[props.component] || {}
  if (!data.modelName) {
    data.modelName = 'modelValue'
  }

  return data
})

const formItemProps = computed(() => {
  const newProps: Record<string, any> = {
    name: props.name,
    ...props.props
  }

  if (props.children) {
    newProps.children = props.children
  }

  return newProps
})

onBeforeMount(() => {
  if (value.value === undefined && props.initialValue !== undefined && !formInstance.design) {
    const newInitialValues = setDataByPath(
      formInstance.initialValues,
      props.name,
      props.initialValue
    )

    formInstance.updateInitialValues(newInitialValues)

    value.value = props.initialValue
  }
})

watch(
  value,
  (newVal, oldVal) => {
    const change = props.change
    const diff = isEqual(newVal, oldVal)

    if (!change || diff) return

    let temp = cloneDeep(formInstance.formValues)

    change.forEach(({ target, value, condition }) => {
      if (condition === false) return

      if (target.includes('.*.')) {
        //自增组件特殊处理
        const targetArr = target.split('.*.')
        const listTarget = targetArr.pop()!
        const targetParse = targetArr.join('.')
        const list = getDataByPath(formInstance.formValues, targetParse)
        if (Array.isArray(list)) {
          temp = setDataByPath(
            temp,
            targetParse,
            list.map((item) => {
              return {
                ...item,
                [listTarget]: value
              }
            })
          )
        }
        return
      }

      temp = setDataByPath(temp, target, value)
    })

    formInstance.updateFormValues(temp)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '@/style';

@include ns('form-item') {
  margin-bottom: 18px;

  &-label {
    display: inline-flex;
    position: relative;
    white-space: nowrap;
    gap: 3px;
    align-items: center;

    &-suffix {
      margin-left: 3px;
    }
  }
}

@include ns('form-item-layout') {
  margin-bottom: 18px;
}
</style>
