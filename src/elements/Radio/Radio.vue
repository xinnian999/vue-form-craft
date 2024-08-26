<template>
  <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
  <el-radio-group v-model="value" @change="selectChange" v-el-loading="loading" v-bind="$attrs">
    <el-space wrap :direction="direction" :size="[space, space]" alignment="normal">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <el-radio
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :border="optionType === 'border'"
          >{{ item[labelKey] }}</el-radio
        >
      </template>

      <template v-else>
        <el-radio-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[valueKey]"
          :size="$attrs.size"
          >{{ item[labelKey] }}
        </el-radio-button>
      </template>
    </el-space>
  </el-radio-group>
</template>

<script setup lang="ts">
import { defineProps,defineModel } from 'vue'
import { ElRadioGroup, ElRadio, ElRadioButton, ElSpace } from 'element-plus'
import useSelect from '@/hooks/useSelect'
import type { Direction, OptionType, SelectProps, SelectValue } from '@/config/commonType'

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
  space: 20
})

const value = defineModel<SelectValue>({ default: '' })

const { currentOptions, selectChange, loading } = useSelect(props)
</script>

