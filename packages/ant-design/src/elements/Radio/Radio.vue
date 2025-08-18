<template>
  <div v-if="formInstance.read">
    {{ currentOptions.find((item) => item[valueKey] === value)?.[labelKey] }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
    <a-radio-group v-model:value="value" @change="selectChange" v-loading="loading" v-bind="$attrs">
      <a-space wrap :direction="direction" :size="[space, space]" alignment="normal">
        <template v-if="optionType === 'circle' || optionType === 'border'">
          <a-radio
            v-for="item in currentOptions"
            :key="item[valueKey]"
            :value="item[valueKey]"
            :disabled="item[disabledKey]"
            :border="optionType === 'border'"
          >
            {{ item[labelKey] }}
          </a-radio>
        </template>

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
      </a-space>
    </a-radio-group>
  </template>
</template>

<script setup lang="ts">
import type { Direction, OptionType, SelectProps, SelectValue } from '@form-magic/core'
import { useFormInstance, useSelect } from '@form-magic/core'
import { watch } from 'vue'

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
