<template>
  <template v-if="formInstance.design || !hidden">
    <div v-if="config.type === 'layout'" :class="classNames" :style="style">
      <RenderComponent />
    </div>

    <div v-else-if="config.type === 'assist'" :class="classNames" :style="style">
      <RenderComponent />
    </div>

    <el-form-item
      v-else
      :class="classNames"
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
            {{ label }}
          </div>
          <el-tooltip effect="dark" :content="help" raw-content v-if="help">
            <Icon name="help" />
          </el-tooltip>
          <div :class="ns('form-item-label-suffix')" v-if="formInstance.schema.labelSuffix">
            {{ formInstance.schema.labelSuffix }}
          </div>
        </div>
      </template>

      <RenderComponent />

      <el-alert
        :class="['form-item-alert']"
        :title="alert"
        type="primary"
        show-icon
        :closable="false"
        v-if="alert"
      />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import { cloneDeep, isEqual } from 'lodash'
import { computed, h, onBeforeMount, watch } from 'vue'
import { Icon } from '@/components'
import { useElements, useFormInstance } from '@/hooks'
import type { FormItemType, RuleItem } from '@/types'
import { deepParse, filterExpressions, getDataByPath, ns, parseRules } from '@/utils'

const props = defineProps<FormItemType>()

const formInstance = useFormInstance()

const elements = useElements()

const value = computed({
  get() {
    return formInstance.getFieldValue(props.name)
  },
  set(val) {
    formInstance.setFieldValue(props.name, val)
  }
})

const computeRules = computed(() => {
  const { rules = [], required } = props

  // rules中的配置优先级更高，如果已配置必填规则，直接使用rules
  const hasRequiredInRules = rules.some((rule) => rule.type === 'required')
  if (hasRequiredInRules) {
    return parseRules(rules)
  }

  // rules中没有必填规则时，根据required属性决定是否添加默认必填规则
  if (required) {
    const defaultRequiredRule: RuleItem = {
      type: 'required',
      message: '该字段是必填字段',
      trigger: 'blur'
    }
    return parseRules([defaultRequiredRule, ...rules])
  }

  return parseRules(rules)
})

const config = computed(() => {
  const data = elements[props.component]
  if (!data) {
    return {
      modelName: 'modelValue',
      type: undefined,
      render: undefined
    } as any
  }

  // 避免修改原对象，使用只读方式
  if (!data.modelName) {
    return { ...data, modelName: 'modelValue' }
  }

  return data
})

const classNames = computed(() => {
  return [
    ns('form-item'),
    props.class,
    `${config.value.component}-${props.name}`,
    { 'hide-label': props.labelWidth === 0 }
  ]
})

const RenderComponent = () => {
  const modelName = config.value.modelName || 'modelValue'
  const propsData = cloneDeep(filterExpressions(props.props))
  const slots = deepParse(props.props?.slots, { h })

  const componentProps = {
    name: props.name,
    formItemProps: props,
    ...propsData,
    [modelName]: value.value,
    [`onUpdate:${modelName}`]: (val: any) => {
      value.value = val
    }
  }

  return h(config.value.render, componentProps, slots)
}

onBeforeMount(() => {
  if (value.value === undefined && props.initialValue !== undefined && !formInstance.design) {
    formInstance.setFieldValue(props.name, props.initialValue)
  }
})

// linkages 联动：可修改数据和 schema
// 性能优化：缓存formValues引用，避免重复调用getValues()
watch(
  value,
  (newVal, oldVal) => {
    const linkages = props.linkages

    // 提前返回，避免不必要的计算
    if (!linkages || linkages.length === 0 || formInstance.design) return
    if (isEqual(newVal, oldVal)) return

    // 缓存formValues，避免多次调用getValues()
    const formValues = formInstance.getValues()

    linkages.forEach(({ target, value, path, customPath, condition, type }) => {
      if (condition === false) return

      // 根据 type 判断联动方式
      if (type === 'attr') {
        // 修改 schema 属性
        // 当 path 为 'custom' 时使用 customPath，否则使用 path
        const actualPath = path === 'custom' ? customPath : path
        if (actualPath !== undefined) {
          if (target.includes('.*.')) {
            // FormList 批量 attr 联动 - 修改所有行的属性
            // 例如: target = 'users.*.password'
            const targetArr = target.split('.*.')
            const fieldName = targetArr.pop()!
            const listPath = targetArr.join('.')
            const list = getDataByPath(formValues, listPath)

            if (Array.isArray(list)) {
              // FormList 的字段在 schema 中的 name 不包含索引,直接使用字段名
              formInstance.setFieldAttr(fieldName, actualPath, value)
            }
          } else if (target.includes('.[]')) {
            // FormList 行内 attr 联动 - 在 parseFields 中处理,这里跳过
            // 例如: target = 'users.[].password'
          } else {
            // 普通 attr 联动
            formInstance.setFieldAttr(target, actualPath, value)
          }
        }
      } else if (type === 'data') {
        // 修改数据
        if (target.includes('.*.')) {
          // 自增组件特殊处理 - 批量修改所有行
          const targetArr = target.split('.*.')
          const listTarget = targetArr.pop()!
          const targetParse = targetArr.join('.')
          const list = getDataByPath(formValues, targetParse)
          if (Array.isArray(list)) {
            formInstance.setFieldValue(
              targetParse,
              list.map((item) => ({
                ...item,
                [listTarget]: value
              }))
            )
          }
        } else if (target.includes('.[]')) {
          // FormList 行内联动 - 只修改当前行
          // 例如: target = 'users.[].vip', props.name = 'users.0.username'
          // 提取当前字段的行索引
          const nameMatch = props.name.match(/^(.+?)\.(\d+)\.(.+)$/)
          if (nameMatch) {
            const [, listPath, rowIndex] = nameMatch
            // 替换 [] 为实际的行索引
            const actualTarget = target.replace('.[]', `.${rowIndex}`)
            // 解析目标字段名
            const targetFieldName = actualTarget.split('.').pop()!
            const currentRowPath = `${listPath}.${rowIndex}`
            const currentRow = getDataByPath(formValues, currentRowPath)

            // 只有当目标字段的值与联动值不同时才更新,避免无限循环
            if (currentRow && currentRow[targetFieldName] !== value) {
              formInstance.setFieldValue(actualTarget, value)
            }
          }
        } else {
          formInstance.setFieldValue(target, value)
        }
      }
    })
  },
  { immediate: true }
)
</script>

<style lang="scss">
@import '@/style';

@include ns('form-item') {
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

  &.hide-label > .el-form-item__label {
    display: none;
  }

  .form-item-alert {
    margin-top: 10px;
  }
}

@include ns('form-item-layout') {
  margin-bottom: 18px;
}
</style>
