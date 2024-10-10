<template>
  <div v-if="read">{{ currentOptions.find((item) => item[valueKey] === value)?.[labelKey] }}</div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
    <el-radio-group v-model="value" @change="selectChange" v-loading="loading" v-bind="$attrs">
      <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
        <template v-if="optionType === 'circle' || optionType === 'border'">
          <el-radio
            v-for="item in currentOptions"
            :key="item[valueKey]"
            :label="item[labelKey]"
            :value="item[valueKey]"
            :disabled="item[disabledKey]"
            :border="optionType === 'border'"
          />
        </template>

        <template v-else>
          <el-radio-button
            v-for="item in currentOptions"
            :key="item[valueKey]"
            :label="item[labelKey]"
            :value="item[valueKey]"
            :disabled="item[disabledKey]"
            v-bind="$attrs"
          />
        </template>
      </el-space>
    </el-radio-group>
  </template>
</template>

<script setup lang="ts">
import type {
  Direction,
  OptionType,
  SelectProps,
  SelectValue
} from '@vue-form-craft/config/commonType'
import { useFormInstance, useSelect } from '@vue-form-craft/hooks'

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

const { read } = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)
</script>
