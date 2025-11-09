<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="[ns('form-item'), props.class]" :style="style">
      <component
        :is="config.render"
        v-bind="componentProps"
        :children="props.children"
        :label="props.label"
        :name="props.name"
      />
    </div>

    <div
      v-else-if="config.type === 'assist'"
      :class="[ns('form-item'), props.class, `${component}-${name}`]"
      :style="style"
    >
      <component :is="config.render" v-bind="componentProps" />
    </div>

    <el-form-item
      v-else
      :class="[ns('form-item'), props.class, `${component}-${name}`]"
      :style="style"
      :key="name"
      :prop="name"
      :rules="computeRules"
      :labelWidth="labelWidth"
      :labelPosition="labelAlign"
      :size="size"
    >
      <template #label>
        <div :class="[ns('form-item-label'), label && `${name}-label`]">
          <div>
            <component
              v-if="formInstance.slots?.label"
              :is="formInstance.slots.label"
              v-bind="props"
            />
            <template v-else>
              {{ label }}
            </template>
          </div>
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
            v-bind="componentProps"
            v-model:[config.modelName!]="value"
          />
        </el-dialog>

        <el-button type="primary" plain @click="handleDialog">配置</el-button>
      </template>

      <component
        v-else
        :is="config.render"
        :disabled="formInstance.schema.disabled"
        v-bind="componentProps"
        v-model:[config.modelName!]="value"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import { cloneDeep, isEqual } from 'lodash'
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { useElements, useFormInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import type { FormItemType } from '@/types'
import { getDataByPath, ns, parseRules, setDataByPath } from '@/utils'

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
    return formInstance.getFieldValue(props.name)
  },
  set(val) {
    formInstance.setFieldValue(props.name, val)
  }
})

const computeRules = computed(() => {
  const { rules, required } = props

  // 如果有 required 标记，添加必填规则
  const allRules = required
    ? [{ type: 'required' as const, message: '该字段是必填字段' }, ...(rules || [])]
    : rules || []

  return parseRules(allRules)
})

const config = computed(() => {
  const data = elements[props.component] || {}
  if (!data.modelName) {
    data.modelName = 'modelValue'
  }

  return data
})

const componentProps = computed(() => {
  const newProps: Record<string, any> = {
    name: props.name,
    designKey: props.designKey,
    ...props.props
  }

  if (props.children) {
    newProps.children = props.children
  }

  return newProps
})

onBeforeMount(() => {
  if (value.value === undefined && props.initialValue !== undefined && !formInstance.design) {
    formInstance.setFieldValue(props.name, props.initialValue)
  }
})

// change 联动：只修改数据
watch(
  value,
  (newVal, oldVal) => {
    const change = props.change
    const diff = isEqual(newVal, oldVal)

    if (!change || diff) return

    const formValues = formInstance.getValues()

    let temp = cloneDeep(formValues)

    change.forEach(({ target, value, condition }) => {
      if (condition === false) return

      if (target.includes('.*.')) {
        //自增组件特殊处理
        const targetArr = target.split('.*.')
        const listTarget = targetArr.pop()!
        const targetParse = targetArr.join('.')
        const list = getDataByPath(formValues, targetParse)
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

    formInstance.setValues(temp)
  },
  { immediate: true }
)

// linkages 联动：可修改数据和 schema
watch(
  value,
  (newVal, oldVal) => {
    const linkages = props.linkages
    const diff = isEqual(newVal, oldVal)

    if (!linkages || diff || formInstance.design) return

    const formValues = formInstance.getValues()

    // 用于批量收集数据修改
    let temp = cloneDeep(formValues)

    linkages.forEach(({ target, value, path, customPath, condition, type }) => {
      if (condition === false) return

      // 根据 type 判断联动方式
      if (type === 'config') {
        // 修改 schema 配置
        // 当 path 为 'custom' 时使用 customPath，否则使用 path
        const actualPath = path === 'custom' ? customPath : path
        if (actualPath !== undefined) {
          formInstance.updateItemSchemaByPath(target, actualPath, value)
        }
      } else if (type === 'data') {
        // 修改数据 - 批量处理
        if (target.includes('.*.')) {
          //自增组件特殊处理
          const targetArr = target.split('.*.')
          const listTarget = targetArr.pop()!
          const targetParse = targetArr.join('.')
          const list = getDataByPath(formValues, targetParse)
          if (Array.isArray(list)) {
            temp = setDataByPath(
              temp,
              targetParse,
              list.map((item) => ({
                ...item,
                [listTarget]: value
              }))
            )
          }
        } else {
          temp = setDataByPath(temp, target, value)
        }
      }
    })

    // 批量更新数据（只有当有数据修改时才更新）
    if (!isEqual(temp, formValues)) {
      formInstance.setValues(temp)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '@/style';

@include ns('form-item') {
  // margin-bottom: 18px;

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
