<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="[ns('form-item'), thisProps.class]" :style="style">
      <component :is="config.render" v-bind="formItemProps" />
    </div>

    <el-form-item
      v-else
      :class="[ns('form-item'), thisProps.class]"
      :style="style"
      :key="name"
      :prop="name"
      :label-width="hideLabel ? '0' : formInstance.schema.labelWidth"
      :rules="computeRules"
    >
      <template #label v-if="!hideLabel">
        <div :class="ns('form-item-label')">
          <div :style="formInstance.schema.labelBold && 'font-weight: bold'">{{ label }}</div>
          <div :class="ns('form-item-label-ico')" v-if="help">
            <el-tooltip effect="dark" :content="help">
              <div><Icon name="help" /></div>
            </el-tooltip>
          </div>
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
import { computed, onMounted, reactive } from 'vue'
import { isRegexString, getDataByPath, setDataByPath, ns } from '@vue-form-craft/utils'
import type { FormItemType } from '@vue-form-craft/types'
import Icon from '@vue-form-craft/icons'
import { useFormInstance } from '@vue-form-craft/hooks'
import { useElements } from '@vue-form-craft/hooks'

const thisProps = defineProps<FormItemType>()

const formInstance = useFormInstance()

const elements = useElements()

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
    return getDataByPath(formInstance.formValues, thisProps.name)
  },
  set(val) {
    const newValues = setDataByPath(formInstance.formValues, thisProps.name, val)
    formInstance.updateFormValues(newValues)
  }
})

const computeRules = computed(() => {
  const { rules, required, component } = thisProps

  const ruleData = []

  if (required) {
    ruleData.push({ required: true, message: '该字段是必填字段', trigger: 'blur' })
  }

  if (rules) {
    const ruleParse = rules.map((rule) => {
      const { type, message, trigger, customReg, templateExp } = rule

      const ruleDef = {
        message,
        trigger
      }

      if (['email', 'url'].includes(type)) {
        return { ...ruleDef, type }
      }
      // 自定义正则
      if (type === 'custom') {
        return {
          ...ruleDef,
          pattern: customReg
        }
      }

      // 解析字符串的正则
      if (isRegexString(type)) {
        return {
          ...ruleDef,
          pattern: type
        }
      }

      // 模板表达式
      if (type === 'template') {
        return {
          ...ruleDef,
          validator: () => templateExp
        }
      }

      return {}
    })

    return [...ruleData, ...ruleParse]
  }

  if (component === 'VerifyCode') {
    const vCodeRule = {
      trigger: 'blur',
      message: '验证码错误！',
      validator: () => formInstance.vCodePass
    }

    return [...ruleData, vCodeRule]
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
  const props: Record<string, any> = {
    name: thisProps.name,
    ...thisProps.props
  }

  if (thisProps.children) {
    props.children = thisProps.children
  }

  return props
})

onMounted(() => {
  if (value.value === undefined && thisProps.initialValue !== undefined && !formInstance.design) {
    const newInitialValues = setDataByPath(
      formInstance.initialValues,
      thisProps.name,
      thisProps.initialValue
    )
    formInstance.updateInitialValues(newInitialValues)
  }
})
</script>
