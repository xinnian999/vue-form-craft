<template>
  <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

  <el-checkbox-group v-bind="$attrs" v-model="selectVal" @change="selectChange" v-el-loading="loading">
    <template v-if="optionType === 'circle' || optionType === 'border'">
      <el-checkbox
        v-for="item in currentOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        :border="optionType === 'border'"
        >{{ item[labelKey] }}</el-checkbox
      >
    </template>

    <el-space v-if="optionType === 'button'" wrap :size="[space, space]">
      <el-checkbox-button
        v-for="item in currentOptions"
        :key="item[valueKey]"
        :label="item[valueKey]"
        size="large"
        >{{ item[labelKey] }}</el-checkbox-button
      >
    </el-space>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import {  defineProps } from 'vue'
import {
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton,
  ElSpace,
  type CheckboxGroupValueType
} from 'element-plus'
import useSelect from '@/hooks/useSelect'
import type { Direction, OptionType, SelectProps } from '@/config/commonType'

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

const { selectVal, currentOptions, selectChange, loading } = useSelect<CheckboxGroupValueType>(props)


</script>

<style lang="scss" scoped></style>
