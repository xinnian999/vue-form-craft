<template>
  <div v-if="read">
      {{
        value
          ?.map((item) => currentOptions.find((v) => v[valueKey] === item)?.[labelKey])
          .join('、')
      }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

    <el-checkbox-group v-bind="$attrs" v-model="value" @change="selectChange" v-loading="loading">
      <template v-if="optionType === 'circle' || optionType === 'border'">
        <el-checkbox
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
          :border="optionType === 'border'"
        />
      </template>

      <el-space v-if="optionType === 'button'" wrap :size="[space, space]">
        <el-checkbox-button
          v-for="item in currentOptions"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
          size="large"
        />
      </el-space>
    </el-checkbox-group>
  </template>
</template>

<script setup lang="ts">
import { type CheckboxGroupValueType } from 'element-plus'
import useSelect from '@vue-form-craft/hooks/useSelect'
import type { Direction, OptionType, SelectProps } from '@vue-form-craft/config/commonType'

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

const { currentOptions, selectChange, loading } = useSelect(props)
</script>

<style lang="scss" scoped></style>
