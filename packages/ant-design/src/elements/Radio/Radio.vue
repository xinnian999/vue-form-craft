<template>
  <div v-if="formInstance.read">
    {{ currentOptions.find((item) => item[valueKey] === value)?.[labelKey] }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
    <a-radio-group
      v-model:value="value"
      @change="selectChange"
      v-loading="loading"
      v-bind="$attrs"
      button-style="solid"
    >
      <a-space
        v-if="optionType === 'circle'"
        wrap
        :direction="direction"
        :size="[space, space]"
        alignment="normal"
      >
        <a-radio
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item[disabledKey]"
        >
          {{ item[labelKey] }}
        </a-radio>
      </a-space>
      <template v-else>
        <a-radio-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item[disabledKey]"
          v-bind="$attrs"
        >
          {{ item[labelKey] }}
        </a-radio-button>
      </template>
    </a-radio-group>
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { Direction, OptionType, SelectProps, SelectValue } from '@vue-form-craft/core'
import { useFormInstance, useSelect } from '@vue-form-craft/core'

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
  disabledKey: 'disabled',
  name: '',
  optionType: 'circle',
  direction: 'horizontal',
  space: 20
})

const value = defineModel<SelectValue>({ default: '' })

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
