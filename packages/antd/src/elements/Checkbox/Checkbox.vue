<template>
  <div v-if="formInstance.read">
    {{
      value?.map((item) => currentOptions.find((v) => v[valueKey] === item)?.[labelKey]).join('、')
    }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

    <a-checkbox-group
      v-bind="$attrs"
      v-model:value="value"
      @change="selectChange"
      v-loading="loading"
    >
      <a-space wrap :direction="direction" :size="[space, space]" alignment="normal">
        <a-checkbox v-for="item in currentOptions" :key="item[valueKey]" :value="item[valueKey]">
          {{ item[labelKey] }}
        </a-checkbox>
      </a-space>
    </a-checkbox-group>
  </template>
</template>

<script setup lang="ts">
import { type CheckboxGroupValueType } from 'element-plus'
import { watch } from 'vue'
import type { Direction, SelectProps } from '@vue-form-craft/core'
import { useFormInstance, useSelect } from '@vue-form-craft/core'

type Props = Omit<SelectProps, 'multiple'> & {
  direction?: Direction
  space?: number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: '',
  direction: 'horizontal',
  space: 20,
  multiple: true
})

const value = defineModel<CheckboxGroupValueType>()

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
