<template>
  <div v-if="formInstance.read">
    {{
      value?.map((item) => currentOptions.find((v) => v[valueKey] === item)?.[labelKey]).join('、')
    }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

    <a-checkbox-group v-bind="$attrs" v-model="value" @change="selectChange" v-loading="loading">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <a-checkbox
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
          :border="optionType === 'border'"
        />
      </template>

      <a-space v-if="optionType === 'button'" wrap :size="[space, space]">
        <a-checkbox-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
          size="large"
        />
      </a-space>
    </a-checkbox-group>
  </template>
</template>

<script setup lang="ts">
import { type CheckboxGroupValueType } from 'element-plus'
import type { Direction, OptionType, SelectProps } from '@form-magic/core'
import { useFormInstance, useSelect } from '@form-magic/core'
import { watch } from 'vue';

type Props = Omit<SelectProps, 'multiple'> & {
  optionType?: OptionType
  direction?: Direction
  space?: number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  mode: 'static',
  labelKey: 'label',
  valueKey: 'value',
  name: '',
  optionType: 'circle',
  direction: 'horizontal',
  space: 20,
  multiple: true
})

const value = defineModel<CheckboxGroupValueType>()

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>